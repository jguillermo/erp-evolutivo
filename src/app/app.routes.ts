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
      },
      {
        path: 'mision-vision-valores',
        loadComponent: () =>
          import('./features/analisis-estrategico/mision-vision-valores/mision-vision-valores.component').then(
            m => m.MisionVisionValoresComponent
          ),
        title: 'Misión, Visión y Valores — Estudio Estratégico'
      },
      {
        path: 'rse',
        loadComponent: () =>
          import('./features/analisis-estrategico/rse/rse.component').then(
            m => m.RseComponent
          ),
        title: 'Responsabilidad Social Empresarial — Estudio Estratégico'
      },
      {
        path: 'foda',
        loadComponent: () =>
          import('./features/analisis-estrategico/foda/foda.component').then(
            m => m.FodaComponent
          ),
        title: 'Matriz FODA Cruzada — Estudio Estratégico'
      },
      {
        path: 'peyea',
        loadComponent: () =>
          import('./features/analisis-estrategico/peyea/peyea.component').then(
            m => m.PeyeaComponent
          ),
        title: 'Matriz PEYEA — Estudio Estratégico'
      },
      {
        path: 'estrategias',
        loadComponent: () =>
          import('./features/analisis-estrategico/estrategias/estrategias.component').then(
            m => m.EstrategiasComponent
          ),
        title: 'Estrategias Globales del Negocio — Estudio Estratégico'
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
      },
      {
        path: 'mercado-objetivo-caracteristicas',
        loadComponent: () =>
          import(
            './features/estudio-mercado/mercado-objetivo-caracteristicas/mercado-objetivo-caracteristicas.component'
          ).then(m => m.MercadoObjetivoCaracteristicasComponent),
        title: 'Características del Mercado — Estudio de Mercado'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'canvas'
  }
];
