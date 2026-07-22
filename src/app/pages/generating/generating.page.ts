import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SessionStateService } from 'src/app/core/services/session-state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-generating',
  templateUrl: './generating.page.html',
  styleUrls: ['./generating.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GeneratingPage implements OnInit {

  public currentMessage: string = ' Preparando tu fotografía...';
  public progressPercent: number = 30;

  constructor(
    private router: Router,
    private sessionState: SessionStateService
  ) { }

  ngOnInit() {
    this.processImageWithPythonBackend();
  }

  async processImageWithPythonBackend() {
    const session: any = this.sessionState.currentData;
    let capturedImage = session?.capturedImageBase64;

    if (!capturedImage) {
      this.router.navigate(['/camera']);
      return;
    }

    try {
      if (!capturedImage.startsWith('data:image')) {
        capturedImage = `data:image/jpeg;base64,${capturedImage}`;
      }

      this.currentMessage = ' Enviando foto al backend de Python...';
      this.progressPercent = 40;

      // 1. Convertir base64 a Blob
      const imageBlob = await fetch(capturedImage).then(res => res.blob());

      this.currentMessage = ' Limpiando fondo y fusionando con IA...';
      this.progressPercent = 65;

      // 2. Preparar el FormData para FastAPI (/api/generate_image)
      const formData = new FormData();
      formData.append('image', imageBlob, 'capture.jpg');

      const response = await fetch(`${environment.apiUrl}/api/generate_image`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Error en el procesamiento del backend');
      }

      // 3. FastAPI nos regresa la ruta de la imagen procesada
      const aiImageUrl = `${environment.apiUrl}/${data.ai_image}`;

      this.progressPercent = 90;

      this.sessionState.updateSession({
        aiImagePath: aiImageUrl,
        originalImagePath: capturedImage
      });

      this.progressPercent = 100;
      setTimeout(() => {
        this.router.navigate(['/preview']);
      }, 400);

    } catch (error) {
     // console.error('❌ Error conectando con el backend de Python:', error);
      
      // Fallback de seguridad
      this.sessionState.updateSession({
        aiImagePath: capturedImage,
        originalImagePath: capturedImage
      });
      this.router.navigate(['/preview']);
    }
  }
}