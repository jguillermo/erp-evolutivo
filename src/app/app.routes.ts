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
    path: 'estudio-estrategico',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/analisis-estrategico/analisis-estrategico.component').then(
            m => m.AnalisisEstrategicoComponent
          ),
        title: 'Estudio Estratégico — ERP Evolutivo'
      },
      {
        path: 'pestel',
        loadComponent: () =>
          import('./features/analisis-estrategico/pestel/pestel.component').then(
            m => m.PestelComponent
          ),
        title: 'PESTEL — Estudio Estratégico'
      },
      {
        path: 'porter',
        loadComponent: () =>
          import('./features/analisis-estrategico/porter/porter.component').then(
            m => m.PorterComponent
          ),
        title: '5 Fuerzas de Porter — Estudio Estratégico'
      },
      {
        path: 'analisis-interno',
        loadComponent: () =>
          import('./features/analisis-estrategico/analisis-interno/analisis-interno.component').then(
            m => m.AnalisisInternoComponent
          ),
        title: 'Análisis Interno — Estudio Estratégico'
      },
      {
        path: 'efi-efe',
        loadComponent: () =>
          import('./features/analisis-estrategico/efi-efe/efi-efe.component').then(
            m => m.EfiEfeComponent
          ),
        title: 'Matrices EFI & EFE — Estudio Estratégico'
      },
      {
        path: 'fce',
        loadComponent: () =>
          import('./features/analisis-estrategico/fce/fce.component').then(
            m => m.FceComponent
          ),
        title: 'Factores Críticos de Éxito — Estudio Estratégico'
      }
    ]
  },
  {
    path: 'estudio-mercado',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/estudio-mercado/estudio-mercado.component').then(
            m => m.EstudioMercadoComponent
          ),
        title: 'Estudio de Mercado — ERP Evolutivo'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'canvas'
  }
];
