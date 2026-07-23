import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { addIcons } from 'ionicons';
import { sparkles, aperture, camera, colorPalette, qrCode, time, images, gift, chevronBack, chevronForward } from 'ionicons/icons';
import { provideHttpClient } from '@angular/common/http';

// Registrar los iconos explícitamente para el motor de producción
addIcons({
  'sparkles': sparkles,
  'aperture': aperture,
  'camera': camera,
  'color-palette': colorPalette,
  'qr-code': qrCode,
  'time': time,
  'images': images,
  'gift': gift,
  'chevron-back': chevronBack,
  'chevron-forward': chevronForward
});

bootstrapApplication(AppComponent, {
 providers: [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideIonicAngular({
    mode: 'ios'
  }),
  provideHttpClient(),
  provideRouter(routes, withPreloading(PreloadAllModules)),
],
});