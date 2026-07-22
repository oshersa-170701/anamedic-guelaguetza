import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SessionStateService } from 'src/app/core/services/session-state';
import { addIcons } from 'ionicons';
import { sparkles, aperture, camera, colorPalette, images, qrCode, time } from 'ionicons/icons';

@Component({
  selector: 'app-idle',
  templateUrl: './idle.page.html',
  styleUrls: ['./idle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IdlePage implements OnInit, OnDestroy {

  private slideTimer: any = null;
  private readonly ROTATION_TIME = 15000; // Tiempo en milisegundos (Ej. 15 segundos para cambiar al catálogo)

  constructor(
    private router: Router,
    private sessionState: SessionStateService
  ) { 
addIcons({ sparkles, camera, colorPalette, qrCode, time, aperture, images });  }

  ngOnInit() {
    this.sessionState.resetSession();
  }

  // ionViewWillEnter se ejecuta cada vez que el usuario regresa a esta pantalla de inicio
  ionViewWillEnter() {
    this.sessionState.resetSession();
    this.startRotationTimer();
  }

  ngOnDestroy() {
    this.clearRotationTimer();
  }

  /**
   * Inicia el temporizador para llevar al usuario al catálogo automáticamente
   */
  startRotationTimer() {
    this.clearRotationTimer();
    this.slideTimer = setTimeout(() => {
      // Navega al catálogo de productos de forma automática
      this.router.navigate(['/catalog']);
    }, this.ROTATION_TIME);
  }

  /**
   * Limpia el temporizador para evitar saltos inesperados
   */
  clearRotationTimer() {
    if (this.slideTimer) {
      clearTimeout(this.slideTimer);
      this.slideTimer = null;
    }
  }

  /**
   * Reinicia el temporizador si el usuario toca la pantalla o interactúa
   */
  @HostListener('window:pointerdown')
  @HostListener('window:keydown')
  resetTimerOnUserAction() {
    this.startRotationTimer();
  }

  /**
   * Escucha global de teclado (Tecla "1" para iniciar Kiosco)
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '1') {
      this.startExperience();
    }
  }

  /**
   * Navega a la vista de la cámara
   */
  startExperience() {
    this.clearRotationTimer();
    this.router.navigate(['/camera']);
  }
}