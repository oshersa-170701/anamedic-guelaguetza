import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { addIcons } from 'ionicons';
import { sparkles, aperture, camera, colorPalette, qrCode, time, images, gift, chevronBack, chevronForward } from 'ionicons/icons';
import { provideHttpClient } from '@angular/common/http';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Registrar los íconos de forma estricta y global
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

// Inicializar los componentes web de Ionic para producción
defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({
      mode: 'ios' // Forzar el diseño limpio y moderno idéntico en todas las plataformas
    }),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});