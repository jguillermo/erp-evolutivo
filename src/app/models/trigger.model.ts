export type TriggerMode = 'auto' | 'suggest' | 'manual' | 'ai';

export interface Trigger {
  type: string;
  example: string;
  unlocks: string;
  mode: TriggerMode;
}

export interface ActivationMode {
  mode: TriggerMode;
  label: string;
  description: string;
  experience: string;
  badgeClass: string;
}

export const TRIGGERS: Trigger[] = [
  { type: '📈 Volumen ventas', example: '+100 ventas/mes × 2 meses', unlocks: 'Cotizaciones, descuentos, multi-moneda', mode: 'suggest' },
  { type: '👥 Personas', example: 'Registras 3er empleado', unlocks: 'Planilla, roles, vacaciones', mode: 'auto' },
  { type: '📍 Ubicaciones', example: 'Agregas 2da dirección', unlocks: 'Multi-local, transferencias', mode: 'auto' },
  { type: '💰 Volumen financiero', example: 'Movimientos +S/20,000/mes', unlocks: 'Contabilidad, libros SUNAT', mode: 'suggest' },
  { type: '📦 Inventario', example: 'Superas 50 SKUs activos', unlocks: 'Órdenes compra, proveedores', mode: 'suggest' },
  { type: '🕐 Tiempo', example: '3 meses de uso con datos', unlocks: 'Tendencias, comparativos', mode: 'auto' },
  { type: '❤️ Clientes', example: '+100 clientes únicos', unlocks: 'Fidelización, puntos', mode: 'suggest' },
  { type: '🌐 Digital', example: 'Activas catálogo online', unlocks: 'E-commerce, pagos', mode: 'manual' },
  { type: '🏭 Producción', example: 'Marcas productos propios', unlocks: 'BOM, costos producción', mode: 'manual' },
  { type: '🧠 IA detecta patrón', example: 'IA ve que necesitas algo antes que tú', unlocks: 'Módulo que la IA recomienda', mode: 'ai' },
];

export const ACTIVATION_MODES: ActivationMode[] = [
  { mode: 'auto', label: 'Automático', description: 'Se activa al cumplir métrica', experience: '¡Felicidades! Has desbloqueado Gestión de Equipos 🎉', badgeClass: 'm-auto' },
  { mode: 'suggest', label: 'Sugerido', description: 'Sistema detecta y recomienda', experience: '"Tu negocio está creciendo. ¿Activar Contabilidad?"', badgeClass: 'm-suggest' },
  { mode: 'manual', label: 'Manual', description: 'Usuario decide activarlo', experience: 'Visible en "Explorar módulos" con preview', badgeClass: 'm-manual' },
  { mode: 'ai', label: '🧠 IA Proactiva', description: 'IA predice que lo necesitarás pronto', experience: '"Empresas como la tuya activan CRM en esta etapa. ¿Lo exploramos?"', badgeClass: 'm-ai' },
];
