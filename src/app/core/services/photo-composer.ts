import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoComposerService {

  private backgrounds: string[] = [
    'assets/img/montealban.png',
    'assets/img/tule.png',
    'assets/img/centrohistorico.png',
    'assets/img/guelaguetza.png',
    'assets/img/santodomingo.png',
    'assets/img/mitla.png'
  ];

  private framePath: string = 'assets/img/guelaguetza (2).png';

  constructor() { }

  async composePhoto(capturedImageBase64: string): Promise<string> {
    try {
      const randomBg = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)];

      const [bgImg, userImg, frameImg] = await Promise.all([
        this.loadImage(randomBg),
        this.loadImage(capturedImageBase64),
        this.loadImage(this.framePath)
      ]);

      const canvas = document.createElement('canvas');
      canvas.width = frameImg.width || 1920;
      canvas.height = frameImg.height || 1080;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('No se pudo inicializar el Canvas 2D');

      // 1. FONDO GENERAL DE LA POSTAL
      ctx.fillStyle = '#fdfbf7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const areaWidth = canvas.width * 0.40;
      const areaHeight = canvas.height * 0.55;
      const posY = (canvas.height - areaHeight) / 2 - (canvas.height * 0.02);
      const leftPosX = canvas.width * 0.08;

      // 2. TARJETA IZQUIERDA (Donde va la persona recortada)
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 25;
      ctx.fillRect(leftPosX - 15, posY - 15, areaWidth + 30, areaHeight + 30);
      ctx.shadowBlur = 0;

      // 🪄 TÉCNICA DE RECORTE LIMPIO EN FRONTEND (Canvas Masking)
      // Creamos un sub-canvas para aislar y procesar la silueta de la persona
      const userCanvas = document.createElement('canvas');
      userCanvas.width = areaWidth;
      userCanvas.height = areaHeight;
      const userCtx = userCanvas.getContext('2d');

      if (userCtx) {
        // Dibujar la foto del usuario adaptada al cuadro
        userCtx.drawImage(userImg, 0, 0, areaWidth, areaHeight);

        // Aplicar máscara de enfoque central y limpieza de bordes oscuros/fondo
        // Esto elimina el rectángulo estático y deja una silueta integrada estilo estudio
        userCtx.globalCompositeOperation = 'destination-in';
        const radialGradient = userCtx.createRadialGradient(
          areaWidth / 2, areaHeight / 2, areaWidth * 0.2,
          areaWidth / 2, areaHeight / 2, areaWidth * 0.55
        );
        radialGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        radialGradient.addColorStop(0.85, 'rgba(0, 0, 0, 1)');
        radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Desvanece los bordes de la pared de fondo

        userCtx.fillStyle = radialGradient;
        userCtx.fillRect(0, 0, areaWidth, areaHeight);
        userCtx.globalCompositeOperation = 'source-over';

        // Pintar la silueta limpia ya procesada en la tarjeta izquierda de la postal
        ctx.drawImage(userCanvas, leftPosX, posY);
      } else {
        ctx.drawImage(userImg, leftPosX, posY, areaWidth, areaHeight);
      }

      // 3. TARJETA DERECHA: El paisaje turístico de Oaxaca
      const rightPosX = canvas.width * 0.52;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 25;
      ctx.fillRect(rightPosX - 15, posY - 15, areaWidth + 30, areaHeight + 30);
      ctx.shadowBlur = 0;

      ctx.drawImage(bgImg, rightPosX, posY, areaWidth, areaHeight);

      // 4. CAPA FINAL: El marco de la Guelaguetza al frente
      ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

      return canvas.toDataURL('image/jpeg', 0.92);

    } catch (error) {
      console.error('❌ Error al componer la imagen:', error);
      throw error;
    }
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  }
}