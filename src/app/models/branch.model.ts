export interface BranchLevel {
  name: string;
  trigger: string;
  features: string[];
  aiFeatures: string[];
}

export interface Branch {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  cssClass: string;
  levels: BranchLevel[];
}

export const BRANCHES: Branch[] = [
  {
    id: 'team',
    icon: '👥',
    title: 'Rama: Equipo Humano',
    subtitle: 'Creces en personas → se activa RRHH',
    cssClass: 'b-team',
    levels: [
      { name: 'Primer ayudante', trigger: 'Trigger: registras 1er colaborador', features: ['Registro', 'Horarios', 'Asistencia'], aiFeatures: ['🧠 Tips contratación'] },
      { name: 'Equipo pequeño', trigger: 'Trigger: 3-5 empleados', features: ['Planilla', 'Roles', 'Vacaciones'], aiFeatures: ['🧠 Benchmark sueldos'] },
      { name: 'Organización formal', trigger: 'Trigger: 10+ empleados', features: ['Organigrama', 'Evaluaciones'], aiFeatures: ['🧠 Estructura óptima'] },
      { name: 'Gestión avanzada', trigger: 'Trigger: 25+ empleados', features: ['KPIs', 'Capacitación', 'Reclutamiento'], aiFeatures: ['🧠 Predicción rotación'] },
      { name: 'Departamento RRHH', trigger: 'Trigger: 50+ empleados', features: ['Clima laboral', 'Plan carrera'], aiFeatures: ['🧠 Estrategia talento'] },
    ]
  },
  {
    id: 'sales',
    icon: '💰',
    title: 'Rama: Ventas y Comercial',
    subtitle: 'Más ventas → herramientas comerciales',
    cssClass: 'b-sales',
    levels: [
      { name: 'Primeras ventas', trigger: 'Trigger: núcleo base', features: ['POS', 'Boletas', 'Caja'], aiFeatures: ['🧠 Tips primer venta'] },
      { name: 'Volumen creciente', trigger: 'Trigger: +100 ventas/mes', features: ['Cotizaciones', 'Descuentos'], aiFeatures: ['🧠 Precios óptimos'] },
      { name: 'Fuerza de ventas', trigger: 'Trigger: +500 ventas o 3+ vendedores', features: ['Comisiones', 'Metas'], aiFeatures: ['🧠 Forecast IA'] },
      { name: 'Canales múltiples', trigger: 'Trigger: 2+ canales', features: ['Omnicanalidad', 'Créditos'], aiFeatures: ['🧠 Mix canales ideal'] },
      { name: 'Operación comercial', trigger: 'Trigger: +2000 ventas/mes', features: ['Territorios', 'B2B'], aiFeatures: ['🧠 Estrategia expansión'] },
    ]
  },
  {
    id: 'locations',
    icon: '📍',
    title: 'Rama: Ubicaciones',
    subtitle: 'Abres locales → gestión multi-sede',
    cssClass: 'b-locations',
    levels: [
      { name: 'Local único', trigger: 'Trigger: estado inicial', features: ['Dirección', 'Datos fiscales'], aiFeatures: [] },
      { name: 'Segundo punto', trigger: 'Trigger: 2da ubicación', features: ['Multi-local', 'Transferencias'], aiFeatures: ['🧠 Análisis zona ideal'] },
      { name: 'Mini cadena', trigger: 'Trigger: 3-5 sedes', features: ['Consolidación', 'Comparativos'], aiFeatures: ['🧠 Sede más rentable'] },
      { name: 'Cadena regional', trigger: 'Trigger: 6-15 sedes', features: ['Gerentes zona', 'P&L sede'], aiFeatures: ['🧠 Expansión óptima'] },
      { name: 'Franquicia', trigger: 'Trigger: 15+ sedes', features: ['Franquicias', 'Royalties'], aiFeatures: ['🧠 Modelo franquicia'] },
    ]
  },
  {
    id: 'inventory',
    icon: '📦',
    title: 'Rama: Inventario',
    subtitle: 'Más productos → gestión logística',
    cssClass: 'b-inventory',
    levels: [
      { name: 'Catálogo simple', trigger: 'Trigger: núcleo', features: ['Productos', 'Stock', 'Alertas'], aiFeatures: [] },
      { name: 'Gestión compras', trigger: 'Trigger: +50 SKUs', features: ['Órdenes compra', 'Proveedores'], aiFeatures: ['🧠 Mejor proveedor'] },
      { name: 'Almacén dedicado', trigger: 'Trigger: ubicación almacén', features: ['Ubicaciones', 'Lotes'], aiFeatures: ['🧠 Stock óptimo'] },
      { name: 'Cadena suministro', trigger: 'Trigger: +500 SKUs', features: ['Reorden auto', 'Trazabilidad'], aiFeatures: ['🧠 Demanda predict'] },
      { name: 'Logística avanzada', trigger: 'Trigger: +2000 SKUs', features: ['WMS', 'Cross-docking'], aiFeatures: ['🧠 Optimizar rutas'] },
    ]
  },
  {
    id: 'finance',
    icon: '📊',
    title: 'Rama: Finanzas',
    subtitle: 'Más movimiento → control financiero',
    cssClass: 'b-finance',
    levels: [
      { name: 'Caja básica', trigger: 'Trigger: núcleo', features: ['Ingresos/Egresos', 'Caja diaria'], aiFeatures: [] },
      { name: 'Control financiero', trigger: 'Trigger: +S/5,000/mes', features: ['Bancos', 'Conciliación'], aiFeatures: ['🧠 Salud financiera'] },
      { name: 'Contabilidad', trigger: 'Trigger: +S/20,000/mes', features: ['Plan contable', 'SUNAT'], aiFeatures: ['🧠 Ahorro tributario'] },
      { name: 'Gestión financiera', trigger: 'Trigger: +S/100,000/mes', features: ['Presupuestos', 'Flujo caja'], aiFeatures: ['🧠 Inversión óptima'] },
      { name: 'CFO digital', trigger: 'Trigger: +S/500,000/mes', features: ['Consolidación', 'NIIF'], aiFeatures: ['🧠 Estrategia fiscal'] },
    ]
  },
  {
    id: 'clients',
    icon: '❤️',
    title: 'Rama: Clientes / CRM',
    subtitle: 'Más clientes → gestión relaciones',
    cssClass: 'b-clients',
    levels: [
      { name: 'Lista clientes', trigger: 'Trigger: +20 clientes', features: ['Directorio', 'Historial'], aiFeatures: ['🧠 Top clientes'] },
      { name: 'Fidelización', trigger: 'Trigger: +100 clientes', features: ['Puntos', 'Promos'], aiFeatures: ['🧠 Retención IA'] },
      { name: 'CRM activo', trigger: 'Trigger: +500 clientes', features: ['Pipeline', 'Email mkt'], aiFeatures: ['🧠 Segmentación IA'] },
      { name: 'Experiencia cliente', trigger: 'Trigger: +2000 clientes', features: ['NPS', 'Tickets'], aiFeatures: ['🧠 Churn prediction'] },
    ]
  },
  {
    id: 'digital',
    icon: '🌐',
    title: 'Rama: Digital',
    subtitle: 'Vendes online → e-commerce',
    cssClass: 'b-digital',
    levels: [
      { name: 'Catálogo online', trigger: 'Trigger: activas digital', features: ['Link catálogo', 'WhatsApp'], aiFeatures: ['🧠 Tips e-commerce'] },
      { name: 'Tienda online', trigger: 'Trigger: +10 pedidos online', features: ['E-commerce', 'Pagos'], aiFeatures: ['🧠 Conversión IA'] },
      { name: 'Omnicanal', trigger: 'Trigger: +100 pedidos', features: ['Marketplaces', 'Social'], aiFeatures: ['🧠 Canal + rentable'] },
      { name: 'Comercio digital', trigger: 'Trigger: +500 pedidos', features: ['API', 'Webhooks'], aiFeatures: ['🧠 Automatización IA'] },
    ]
  },
  {
    id: 'analytics',
    icon: '🧠',
    title: 'Rama: Inteligencia',
    subtitle: 'Más datos → mejores decisiones',
    cssClass: 'b-analytics',
    levels: [
      { name: 'Dashboard básico', trigger: 'Trigger: núcleo', features: ['Ventas hoy', 'Top productos'], aiFeatures: ['🧠 Insights diarios'] },
      { name: 'Reportes', trigger: 'Trigger: +3 meses datos', features: ['Tendencias', 'Comparativos'], aiFeatures: ['🧠 Alertas anomalías'] },
      { name: 'Analytics avanzado', trigger: 'Trigger: +6 meses + 2 ramas', features: ['Márgenes', 'Rentabilidad'], aiFeatures: ['🧠 Recomendaciones'] },
      { name: 'BI completo', trigger: 'Trigger: +12 meses + 4 ramas', features: ['Dashboards custom'], aiFeatures: ['🧠 Predicciones', '🧠 Simulaciones'] },
    ]
  },
  {
    id: 'production',
    icon: '🏭',
    title: 'Rama: Producción',
    subtitle: 'Fabricas → gestión productiva',
    cssClass: 'b-production',
    levels: [
      { name: 'Recetas / BOM', trigger: 'Trigger: producción propia', features: ['BOM simple', 'Costos'], aiFeatures: ['🧠 Costo óptimo'] },
      { name: 'Órdenes producción', trigger: 'Trigger: +10 producciones/mes', features: ['Órdenes trabajo', 'Consumo'], aiFeatures: ['🧠 Eficiencia'] },
      { name: 'Planta productiva', trigger: 'Trigger: +50 producciones', features: ['Calidad', 'Mermas'], aiFeatures: ['🧠 Reducir merma'] },
      { name: 'MRP', trigger: 'Trigger: +200 producciones', features: ['MRP', 'Capacidad'], aiFeatures: ['🧠 Planificación IA'] },
    ]
  },
];
