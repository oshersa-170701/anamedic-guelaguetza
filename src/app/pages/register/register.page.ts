import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/core/services/api';
import { SessionStateService } from 'src/app/core/services/session-state';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  public phone: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private sessionState: SessionStateService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() { }

  onPhoneInput(event: any) {
    const val = event.target.value;
    this.phone = val.replace(/\D/g, '').substring(0, 10);
  }

  goBack() {
    this.router.navigate(['/preview']);
  }

  async submitRegister() {
    if (!this.phone || this.phone.length !== 10) {
      this.showToast('Por favor introduce un número de teléfono válido de 10 dígitos.', 'warning');
      return;
    }

    const session = this.sessionState.currentData;

    if (!session.aiImagePath) {
      this.showToast('No se encontró la imagen procesada.', 'danger');
      this.router.navigate(['/camera']);
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Generando tu código QR...',
      spinner: 'crescent'
    });
    await loading.present();

    const origImage = session.originalImagePath || '';
    const aiImage = session.aiImagePath;

    // Pasamos los 3 argumentos que requiere ApiService
    this.apiService.registerSession(this.phone, origImage, aiImage).subscribe({
      next: (regRes) => {
        loading.dismiss();

        if (regRes && regRes.success) {
          this.sessionState.updateSession({
            phone: this.phone,
            sessionId: regRes.session_id,
            downloadCode: regRes.code,
            downloadUrl: regRes.url,
            qrImagePath: regRes.qr
          });

          this.router.navigate(['/qr']);
        } else {
          this.showToast(regRes.message || 'Error al registrar la sesión.', 'danger');
        }
      },
      error: (err) => {
        loading.dismiss();
        console.error('Error en registerSession:', err);
        this.showToast('Error de conexión con el servidor.', 'danger');
      }
    });
  }

  async showToast(msg: string, color: string = 'dark') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}