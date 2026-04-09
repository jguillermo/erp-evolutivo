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
    path: 'tree',
    loadComponent: () => import('./features/tree/tree.component').then(m => m.TreeComponent),
    title: 'Árbol Evolutivo — ERP Evolutivo'
  },
  {
    path: 'ai',
    loadComponent: () => import('./features/ai/ai.component').then(m => m.AiComponent),
    title: 'IA Asesora — ERP Evolutivo'
  },
  {
    path: 'triggers',
    loadComponent: () => import('./features/triggers/triggers.component').then(m => m.TriggersComponent),
    title: 'Triggers — ERP Evolutivo'
  },
  {
    path: 'pricing',
    loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent),
    title: 'Precios — ERP Evolutivo'
  },
  {
    path: '**',
    redirectTo: 'canvas'
  }
];
