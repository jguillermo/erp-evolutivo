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
    path: 'analisis-estrategico',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/analisis-estrategico/analisis-estrategico.component').then(
            m => m.AnalisisEstrategicoComponent
          ),
        title: 'Análisis Estratégico — ERP Evolutivo'
      },
      {
        path: 'pestel',
        loadComponent: () =>
          import('./features/analisis-estrategico/pestel/pestel.component').then(
            m => m.PestelComponent
          ),
        title: 'PESTEL — Análisis Estratégico'
      },
      {
        path: 'porter',
        loadComponent: () =>
          import('./features/analisis-estrategico/porter/porter.component').then(
            m => m.PorterComponent
          ),
        title: '5 Fuerzas de Porter — Análisis Estratégico'
      },
      {
        path: 'analisis-interno',
        loadComponent: () =>
          import('./features/analisis-estrategico/analisis-interno/analisis-interno.component').then(
            m => m.AnalisisInternoComponent
          ),
        title: 'Análisis Interno (AMOFHIT) — Análisis Estratégico'
      },
      {
        path: 'efi-efe',
        loadComponent: () =>
          import('./features/analisis-estrategico/efi-efe/efi-efe.component').then(
            m => m.EfiEfeComponent
          ),
        title: 'Matrices EFI & EFE — Análisis Estratégico'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'canvas'
  }
];
