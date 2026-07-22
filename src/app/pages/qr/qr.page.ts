import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { SessionStateService } from 'src/app/core/services/session-state';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class QrPage implements OnInit {

  public qrImageUrl: string = '';
  public downloadCode: string = '';
  public downloadUrl: string = '';

  constructor(
    private router: Router,
    private sessionState: SessionStateService
  ) { }

  ngOnInit() {
    const session = this.sessionState.currentData;

    if (session.downloadCode && session.qrImagePath) {
      this.downloadCode = session.downloadCode;
      this.downloadUrl = session.downloadUrl || '';

      // Ajuste de ruta relativa/absoluta para la imagen del QR
      if (session.qrImagePath.startsWith('http')) {
        this.qrImageUrl = `${session.qrImagePath}?t=${Date.now()}`;
      } else {
        this.qrImageUrl = `${environment.apiUrl}/${session.qrImagePath}?t=${Date.now()}`;
      }
    } else {
      // Si no hay datos de QR, redirigir a inicio
      this.router.navigate(['/idle']);
    }
  }

  /**
   * Finaliza el flujo y avanza a la pantalla de agradecimiento
   */
  finish() {
    this.router.navigate(['/thanks']);
  }
}