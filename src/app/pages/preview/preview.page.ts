import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SessionStateService } from 'src/app/core/services/session-state';
import { addIcons } from 'ionicons';
import { sparkles, cameraReverse, qrCode, downloadOutline, home } from 'ionicons/icons';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreviewPage implements OnInit {

  public aiImageUrl: SafeUrl | string = '';
  public rawAiImagePath: string = ''; 
  public qrCodeUrl: string = '';
  public downloadLink: string = '';
  public isLoadingQr: boolean = false;
  public isQrVisible: boolean = false; 
  private inactivityTimer: any = null;

  constructor(
    private router: Router,
    private sessionState: SessionStateService,
    private sanitizer: DomSanitizer
  ) {
    // 🌟 Registrar explícitamente los íconos que usamos en el HTML
    addIcons({
      sparkles,
      'camera-reverse': cameraReverse,
      'qr-code': qrCode,
      'download-outline': downloadOutline,
      home
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadPreviewImage();
    this.qrCodeUrl = ''; 
    this.isQrVisible = false;
    this.clearTimer();
  }

  ionViewWillLeave() {
    this.clearTimer(); 
  }

  loadPreviewImage() {
    const session: any = this.sessionState.currentData;
    const composedImage = session?.aiImagePath || session?.ai_image;

    if (composedImage) {
      this.rawAiImagePath = composedImage; 
      if (composedImage.startsWith('data:image')) {
        this.aiImageUrl = this.sanitizer.bypassSecurityTrustUrl(composedImage);
      } else {
        this.aiImageUrl = this.sanitizer.bypassSecurityTrustUrl(`${composedImage}?t=${Date.now()}`);
      }
    } else if (session?.capturedImageBase64) {
      this.aiImageUrl = this.sanitizer.bypassSecurityTrustUrl(session.capturedImageBase64);
    } else {
      this.aiImageUrl = '';
    }
  }

  async generateQRCode() {
    this.isLoadingQr = true;

    try {
      const session: any = this.sessionState.currentData;
      let activeImagePath = this.rawAiImagePath || session?.aiImagePath || session?.ai_image || '';

      if (activeImagePath.includes('?')) {
        activeImagePath = activeImagePath.split('?')[0];
      }

      const formData = new FormData();
      formData.append('ai_image', activeImagePath);

      const response = await fetch('http://localhost:8000/api/register_session', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        this.qrCodeUrl = `http://localhost:8000/${data.qr}`;
        this.downloadLink = data.url;
        this.isQrVisible = true; 
        
        // ⏱️ Activar temporizador de 30 segundos para el auto-reset del tótem
        this.startInactivityTimer();
      } else {
       // console.error('❌ Error generando QR en Python:', data.message);
      }
    } catch (error: any) {
      //console.error('❌ Error de red:', error?.message || error);
    } finally {
      this.isLoadingQr = false;
    }
  }

  startInactivityTimer() {
    this.clearTimer();
    this.inactivityTimer = setTimeout(() => {
      this.goHome(); // Esto ahora los mandará a /thanks, y de ahí al home automáticamente
    }, 30000);
  }

  clearTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
  }

  goHome() {
    this.clearTimer();
    // 🌟 En lugar de ir directo al home, mandamos al usuario a la pantalla de gracias
    this.router.navigate(['/thanks']); 
  }

  retakePhoto() {
    this.clearTimer();
    this.isQrVisible = false; 
    this.qrCodeUrl = '';
    this.sessionState.updateSession({
      capturedImageBase64: undefined,
      originalImagePath: undefined,
      aiImagePath: undefined
    });
    this.router.navigate(['/camera']);
  }
}