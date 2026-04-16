import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'canvas',
    pathMatch: 'full'
  },
  {
    path: 'canvas',
    loadComponent: () => import('./features/canvas/canvas.component').then(m => m.CanvasComponent),
    title: 'Canvas — ERP Evolutivo'
  },
  {
    path: '**',
    redirectTo: 'canvas'
  }
];
