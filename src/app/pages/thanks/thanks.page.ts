import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SessionStateService } from 'src/app/core/services/session-state';
import { addIcons } from 'ionicons';
import { heart, cafeOutline, bagHandleOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.page.html',
  styleUrls: ['./thanks.page.scss'], // Usa los estilos oaxaqueños que ya tienes definidos
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ThanksPage implements OnInit, OnDestroy {

  public countdown: number = 10;
  private timer: any = null;

  constructor(
    private router: Router,
    private sessionState: SessionStateService
  ) {
    // 🌟 Registro de íconos institucionales
    addIcons({
      heart,
      'cafe-outline': cafeOutline,
      'bag-handle-outline': bagHandleOutline,
      'time-outline': timeOutline
    });
  }

  ngOnInit() {
    this.startRestartTimer();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  /**
   * Conteo regresivo para reiniciar el kiosco automáticamente
   */
  startRestartTimer() {
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timer);
        this.restartKiosk();
      }
    }, 1000);
  }

  /**
   * Limpia datos y regresa a la pantalla principal de inicio
   */
  restartKiosk() {
    this.clearTimer();
    this.sessionState.resetSession();
    this.router.navigate(['/home']); // Ajusta a '/idle' o '/home' según tu ruta principal
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}