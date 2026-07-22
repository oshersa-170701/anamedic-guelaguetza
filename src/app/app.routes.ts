import { Routes } from '@angular/router';
import { IdlePage } from './pages/idle/idle.page';
import { CameraPage } from './pages/camera/camera.page';
import { GeneratingPage } from './pages/generating/generating.page';
import { PreviewPage } from './pages/preview/preview.page';
import { RegisterPage } from './pages/register/register.page';
import { QrPage } from './pages/qr/qr.page';
import { ThanksPage } from './pages/thanks/thanks.page';
import { CatalogPage } from './pages/catalog/catalog.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'idle',
    pathMatch: 'full',
  },
  {
    path: 'idle',
    component: IdlePage
  },
  {
    path: 'camera',
    component: CameraPage
  },
  {
    path: 'generating',
    component: GeneratingPage
  },
  {
    path: 'preview',
    component: PreviewPage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'qr',
    component: QrPage
  },
  {
    path: 'thanks',
    component: ThanksPage
  },
  {
    path: 'catalog',
    component: CatalogPage
  },
  {
    path: '**',
    redirectTo: 'idle'
  }
];