import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CameraService } from 'src/app/core/services/camera';
import { SessionStateService } from 'src/app/core/services/session-state';
import { addIcons } from 'ionicons';
import { camera, cameraReverse, eyeOutline, informationCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CameraPage implements OnInit, OnDestroy {

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  public countdown: number = 10; // Iniciamos en 10 segundos como solicitaste
  public showCountdown: boolean = true;
  private stream: MediaStream | null = null;
  private timer: any = null;

  constructor(
    private router: Router,
    private cameraService: CameraService,
    private sessionState: SessionStateService
  ) {
    addIcons({ camera, cameraReverse, eyeOutline, informationCircleOutline });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.resetCameraState();
    this.initWebcam();
  }

  ngOnDestroy() {
    this.stopWebcam();
    this.clearTimer();
  }

  resetCameraState() {
    this.showCountdown = true;
    this.countdown = 10; // 10 segundos automáticos
    this.clearTimer();
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  async initWebcam() {
    this.stopWebcam();
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1024, height: 768, facingMode: 'user' },
        audio: false
      });

      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
      }

      // Una vez encendida la cámara, arrancamos el conteo automático de 10 segundos
      this.startAutomaticCountdown();

    } catch (error) {
      //console.error('Error al acceder a la cámara Web:', error);
      this.captureWithCapacitor();
    }
  }

  stopWebcam() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  startAutomaticCountdown() {
    this.clearTimer();
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.clearTimer();
        this.takeSnapshot();
      }
    }, 1000);
  }

  /**
   * Escucha global de teclado (Tecla "1" para regresar al inicio)
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '1') {
      this.retakePhoto();
    }
  }

  // En tu método takeSnapshot(), aplica los filtros estéticos antes de pasarlo al canvas:

async takeSnapshot() {
  const video = this.videoElement.nativeElement;
  const canvas = this.canvasElement.nativeElement;
  const context = canvas.getContext('2d');

  if (context && video) {
    canvas.width = video.videoWidth || 1024;
    canvas.height = video.videoHeight || 768;

    // MAGIA INTELIGENTE: Aplicamos corrección de color, saturación y contraste al contexto
    // antes de pintar la imagen para que la foto final luzca vibrante y profesional estilo oaxaqueño
    context.filter = 'brightness(1.05) contrast(1.1) saturate(1.2)';
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const rawBase64 = canvas.toDataURL('image/jpeg', 0.9); // Alta calidad inicial
    const compressedBase64 = await this.cameraService.compressBase64(rawBase64, 800, 0.8);

    this.sessionState.updateSession({
      capturedImageBase64: compressedBase64
    });

    this.stopWebcam();
    this.router.navigate(['/generating']);
  }
}

  async captureWithCapacitor() {
    try {
      const photo = await this.cameraService.takePhoto();
      if (photo.base64String) {
        const rawBase64 = `data:image/jpeg;base64,${photo.base64String}`;
        const compressedBase64 = await this.cameraService.compressBase64(rawBase64, 800, 0.75);

        this.sessionState.updateSession({
          capturedImageBase64: compressedBase64
        });
        this.router.navigate(['/generating']);
      }
    } catch (error) {
     // console.error('Error capturando con Capacitor Camera', error);
    }
  }

  retakePhoto() {
    this.stopWebcam();
    this.clearTimer();
    this.router.navigate(['/idle']);
  }
}