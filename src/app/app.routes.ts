import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'idle',
    pathMatch: 'full',
  },
  {
    path: 'idle',
    loadComponent: () => import('./pages/idle/idle.page').then( m => m.IdlePage)
  },
  {
    path: 'camera',
    loadComponent: () => import('./pages/camera/camera.page').then( m => m.CameraPage)
  },
  {
    path: 'generating',
    loadComponent: () => import('./pages/generating/generating.page').then( m => m.GeneratingPage)
  },
  {
    path: 'preview',
    loadComponent: () => import('./pages/preview/preview.page').then( m => m.PreviewPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'qr',
    loadComponent: () => import('./pages/qr/qr.page').then( m => m.QrPage)
  },
  {
    path: 'thanks',
    loadComponent: () => import('./pages/thanks/thanks.page').then( m => m.ThanksPage)
  },
  {
    path: 'catalog',
    loadComponent: () => import('./pages/catalog/catalog.page').then(m => m.CatalogPage)
  },
  // EL COMODÍN SIEMPRE AL FINAL
  {
    path: '**',
    redirectTo: 'idle'
  }
];