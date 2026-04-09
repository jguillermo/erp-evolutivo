export interface PricingFeature {
  text: string;
  isAi: boolean;
}

export interface PricingPlan {
  id: string;
  icon: string;
  name: string;
  range: string;
  amount: string;
  period: string;
  description: string;
  isPopular: boolean;
  cssClass: string;
  features: PricingFeature[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'semilla',
    icon: '🌱',
    name: 'Semilla',
    range: 'Emprendedor solo',
    amount: 'Gratis',
    period: 'para siempre',
    description: 'Núcleo base + IA básica. Todo para empezar.',
    isPopular: false,
    cssClass: 'pc1',
    features: [
      { text: 'Ventas ilimitadas', isAi: false },
      { text: 'Hasta 30 productos', isAi: false },
      { text: '1 usuario', isAi: false },
      { text: 'Dashboard básico', isAi: false },
      { text: 'IA Asesora: 3 consultas/día', isAi: true },
      { text: 'Tips generales por sector', isAi: true },
    ]
  },
  {
    id: 'crecimiento',
    icon: '🌿',
    name: 'Crecimiento',
    range: 'Negocio en expansión',
    amount: 'S/ 49',
    period: '/mes + S/9 por rama activa',
    description: 'Ramas a la carta + IA Estratégica.',
    isPopular: true,
    cssClass: 'pc2',
    features: [
      { text: 'Todo de Semilla', isAi: false },
      { text: 'Productos ilimitados', isAi: false },
      { text: 'Hasta 5 usuarios', isAi: false },
      { text: 'Hasta 3 ramas activas', isAi: false },
      { text: 'IA Estratégica ilimitada', isAi: true },
      { text: 'Opciones rankeadas', isAi: true },
      { text: 'Benchmark vs sector', isAi: true },
    ]
  },
  {
    id: 'empresa',
    icon: '🌳',
    name: 'Empresa',
    range: 'Negocio establecido',
    amount: 'S/ 149',
    period: '/mes · todas las ramas',
    description: 'Acceso total + IA Predictiva completa.',
    isPopular: false,
    cssClass: 'pc3',
    features: [
      { text: 'Todo de Crecimiento', isAi: false },
      { text: 'Usuarios ilimitados', isAi: false },
      { text: 'Todas las ramas', isAi: false },
      { text: 'Multi-sucursal', isAi: false },
      { text: 'IA Predictiva completa', isAi: true },
      { text: 'Simulación escenarios', isAi: true },
      { text: 'Detección de riesgos', isAi: true },
    ]
  },
  {
    id: 'corporativo',
    icon: '🏔️',
    name: 'Corporativo',
    range: 'Cadena / Franquicia',
    amount: 'Custom',
    period: 'según requerimiento',
    description: 'Todo + IA Ejecutiva entrenada en tu sector.',
    isPopular: false,
    cssClass: 'pc4',
    features: [
      { text: 'Todo de Empresa', isAi: false },
      { text: 'API completa', isAi: false },
      { text: 'Módulo franquicias', isAi: false },
      { text: 'SLA garantizado', isAi: false },
      { text: 'IA Ejecutiva', isAi: true },
      { text: 'Modelos financieros IA', isAi: true },
      { text: 'IA entrenada en tu sector', isAi: true },
    ]
  },
];
