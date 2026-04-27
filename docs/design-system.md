# Design System — ERP Evolutivo

## Principios

Todos los componentes del design system siguen estas tres reglas sin excepción:

1. **Standalone** — `standalone: true` en el decorador `@Component`. Sin NgModules.
2. **Tailwind CSS** — cero archivos `.css` / `.scss` ni bloques `<style>`. Todos los estilos son clases de Tailwind en el template.
3. **Angular CDK** — comportamiento, accesibilidad e interacción vía `@angular/cdk`. Sin lógica de UI propia.

---

## Stack

| Capa | Herramienta | Uso |
|---|---|---|
| Estilos | Tailwind CSS v3 | Clases utilitarias + tokens en `tailwind.config.js` |
| Comportamiento | Angular CDK | Focus, overlay, drag, a11y, portal |
| Reactividad | Angular Signals | Estado interno de componentes |
| Testing | Vitest + Angular TestBed | Verificar clases Tailwind vía `data-testid` |

---

## Utilidades de texto

Definidas en `src/styles.css` como clases globales. No requieren componente.

| Clase | Color | Uso |
|---|---|---|
| `.hl` | `#c4b5fd` (violeta) | Términos clave generales |
| `.hl2` | `#22d3ee` (cyan) | Términos de crecimiento |
| `.hl3` | `#4ade80` (verde) | Términos de ingresos |
| `.hl-ai` | `#f9a8d4` (rosa) | Términos relacionados con IA |

Light mode: colores sobrescritos por `.light-mode .hl` etc. en `src/styles.css`.

---

## Sistema de colores

**Un solo archivo para gobernarlos todos: `colors.js` en la raíz del proyecto.**

Para cambiar el color primario de indigo a azul, basta editar una línea:
```js
// colors.js
const primary = twColors.blue   // ← cambio aquí, toda la app se actualiza
```

### Aliases semánticos

| Token | Paleta base | Uso |
|---|---|---|
| `primary` | indigo | Acciones, botones, focus ring |
| `accent` | cyan | Destacados, datos, info |
| `success` | emerald | Estados positivos, ingresos |
| `warning` | amber | Atención, alertas |
| `danger` | red | Errores, acciones destructivas |
| `info` | blue | Informativo neutro |
| `ai` | violet | Elementos de IA |

En HTML: `bg-primary-500`, `text-accent-400`, `border-danger-300`, `bg-success-500/10`

Cada alias expone la escala completa de 50 a 950:
`primary-50` `primary-100` `primary-200` … `primary-900` `primary-950`

### Tokens de superficie

| Token | Valor | Uso |
|---|---|---|
| `bg-base` | `#0f1117` | Fondo del body / canvas exterior |
| `bg-surface` | `#1a1d27` | Tarjetas, paneles |
| `bg-surface-raised` | `#242838` | Tooltips, dropdowns |
| `bg-surface-overlay` | `#2d3148` | Modales |
| `border-line` | `#2a2d3a` | Bordes por defecto |
| `border-line-strong` | `#4a4d5a` | Bordes en hover / focus |
| `text-ink` | `#e0e0e0` | Texto principal |
| `text-ink-muted` | `#b0b3c0` | Texto secundario |
| `text-ink-subtle` | `#888888` | Placeholder, timestamps |

### Reglas

1. **Nunca** valores hex sueltos (`#6366f1`, `rgba(...)`) en templates ni constantes de componente.
2. **Usar siempre** aliases semánticos: `primary-500` en vez de `indigo-500`.
3. Las constantes de componente (`CARD_COLORS`, `BADGE_COLORS`, etc.) siguen existiendo para que Tailwind JIT las detecte, pero ya referencian tokens nombrados.
4. Para opacidad usa la sintaxis `/`: `bg-primary-500/20`, `border-success-500/30`.

---

## Convenciones de template

```html
<!-- ✅ Correcto -->
<div class="bg-surface border border-line rounded-[10px] p-3">

<!-- ✅ Correcto — grid span con valores arbitrarios Tailwind -->
<app-card class="[grid-column:1/3] [grid-row:1/3]
                 max-[1000px]:[grid-column:auto] max-[1000px]:[grid-row:auto]
                 print:[grid-column:1/3] print:[grid-row:1/3]">

<!-- ❌ Incorrecto — nunca estilos inline para diseño -->
<div style="background:#1a1d27; border:1px solid #2a2d3a">

<!-- ❌ Incorrecto — nunca [style.gridColumn] ni [style.gridRow] -->
<app-card [style.gridColumn]="'1/3'" [style.gridRow]="'1/3'">

<!-- ❌ Incorrecto — nunca bloques <style> en templates -->
<style>.canvas-block { ... }</style>
```

---

## Convenciones de data-testid

Estructura jerárquica: `{componente}-{n}-{parte}`

```html
<app-card testId="card-1">          <!-- data-testid="card-1"          -->
  <!-- bar:      data-testid="card-1-bar"      -->
  <!-- title:    data-testid="card-1-title"    -->
  <!-- question: data-testid="card-1-question" -->
  <ul data-testid="card-1-list">    <!-- proyectado por el padre       -->
```

Regla: el componente padre es responsable de los `data-testid` de contenido proyectado.

---

## Print

Usar el variant `print:` de Tailwind para todas las reglas de impresión:

```html
<h3 class="text-[0.72rem] print:text-[8px]">
<p  class="text-[0.65rem] print:text-[6.5px]">
```

El `@page` size (A3 landscape) se declara en `src/styles.css` como regla global — es el único CSS externo permitido para print layout.

---

## Catálogo de componentes

| Componente | Selector | Estado | CDK usado |
|---|---|---|---|
| `CardComponent` | `app-card` | ✅ Creado | `FocusMonitor` |
| `BadgeComponent` | `app-badge` | ✅ Creado | — |
| `ListComponent` | `app-list` | ✅ Creado | — |
| `ListItemComponent` | `app-list-item` | ✅ Creado | — |
| `SectionComponent` | `app-section` | ✅ Creado | — |
| `ButtonComponent` | `app-button` | ✅ Creado | `FocusMonitor` |
| `AlertComponent` | `app-alert` | ✅ Creado | — |
| `TooltipComponent` | `app-tooltip` | ✅ Creado | — |
| `QuotedTextComponent` | `app-quoted-text` | ✅ Creado | — |
| `BadgeLabelComponent` | `app-badge-label` | ✅ Creado | — |
| `ComparisonRowComponent` | `app-comparison-row` | ✅ Creado | — |
| `TierSectionComponent` | `app-tier-section` | ✅ Creado | — |
| `StatRowComponent` | `app-stat-row` | ✅ Creado | — |
| `PageHeaderComponent` | `app-page-header` | ✅ Creado | — |
| `EmptyStateComponent` | `app-empty-state` | ✅ Creado | — |

---

## API de componentes

### `app-list` + `app-list-item`

```html
<app-list [testId]="'my-list'">
  <app-list-item>Texto con <span class="hl">énfasis</span> o <app-badge>...</app-badge></app-list-item>
</app-list>
```

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `testId` | `string` | No | Valor de `data-testid` en el host |

### `app-section`

```html
<app-section variant="callout" title="🎮 Título opcional" [testId]="'sec-1'">
  Contenido proyectado aquí
</app-section>
```

| Input | Tipo | Requerido | Valores |
|---|---|---|---|
| `variant` | `SectionVariant` | **Sí** | `'note'` · `'info'` · `'callout'` · `'highlight'` |
| `title` | `string` | No | Texto del encabezado de la sección |
| `testId` | `string` | No | Valor de `data-testid` |

Variantes visuales:
- **note** → fondo sutil + borde izquierdo gris (notas, viabilidad)
- **info** → fondo cyan tenue sin borde (comparaciones, info)
- **callout** → fondo violeta + borde (mecánicas, módulos destacados)
- **highlight** → fondo ámbar + borde fuerte (beachhead, destacados)
- **feature** → fondo cyan + borde cyan (módulo principal de entrada, CTA destacado)

### `app-button`

```html
<app-button variant="primary" size="md" [disabled]="false" ariaLabel="Acción" (clicked)="handler()">
  Texto del botón
</app-button>
```

| Input | Tipo | Default | Valores |
|---|---|---|---|
| `variant` | `ButtonVariant` | `'primary'` | `'primary'` · `'secondary'` · `'ghost'` |
| `size` | `ButtonSize` | `'md'` | `'sm'` · `'md'` · `'lg'` |
| `disabled` | `boolean` | `false` | — |
| `ariaLabel` | `string` | — | Accesibilidad |
| `testId` | `string` | — | `data-testid` |

Output: `clicked: OutputRef<void>`

### `app-alert`

```html
<app-alert variant="info" message="Texto del mensaje" [dismissible]="true" (dismissed)="handler()" />
```

| Input | Tipo | Requerido | Valores |
|---|---|---|---|
| `variant` | `AlertVariant` | **Sí** | `'info'` · `'success'` · `'warning'` · `'error'` |
| `message` | `string` | **Sí** | Texto a mostrar |
| `dismissible` | `boolean` | No (false) | Muestra botón de cierre |
| `testId` | `string` | No | `data-testid` |

Output: `dismissed: OutputRef<void>`  
ARIA: `role="alert"` (error) / `role="status"` (resto). `aria-live` automático.

### `app-tooltip`

```html
<app-tooltip text="Texto del tooltip" position="top">
  <button>Hover aquí</button>
</app-tooltip>
```

| Input | Tipo | Default | Valores |
|---|---|---|---|
| `text` | `string` | **Requerido** | Texto visible en el tooltip |
| `position` | `TooltipPosition` | `'top'` | `'top'` · `'bottom'` · `'left'` · `'right'` |
| `testId` | `string` | — | `data-testid` |

Visibilidad: CSS `opacity-0` → `opacity-100` via `group-hover:` y `group-focus-within:`.

### `app-quoted-text`

```html
<app-quoted-text testId="card-4-value-statement">
  Texto con borde izquierdo cyan e itálica.
</app-quoted-text>
```

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `testId` | `string` | No | `data-testid` en el host |

Proyecta contenido en un `<p>` con `border-l-2 border-[#22d3ee] italic`. Uso: frases de posicionamiento, citas estratégicas.

### `app-badge-label`

```html
<app-badge-label
  variant="title"
  badgeColor="amber-solid"
  badgeTestId="badge-7-1"
  badgeText="BEACHHEAD"
  labelText="Foco de lanzamiento"
/>
```

| Input | Tipo | Requerido | Valores |
|---|---|---|---|
| `badgeColor` | `BadgeColor` | **Sí** | mismos que `app-badge` |
| `badgeText` | `string` | **Sí** | texto del badge |
| `badgeTestId` | `string` | **Sí** | `data-testid` del badge |
| `labelText` | `string` | **Sí** | texto del span descriptor |
| `variant` | `BadgeLabelVariant` | No (`'description'`) | `'title'` · `'description'` |
| `testId` | `string` | No | `data-testid` en el host |

Variantes: **title** → `text-[#fef3c7] font-bold` · **description** → `text-[#9ca3af]`

### `app-comparison-row`

```html
<app-comparison-row competitor="Odoo / Otros" testId="card-4-vs-label-2">
  <span class="hl-ai">IA asesora integrada</span> + solo pagas módulos que usas
</app-comparison-row>
```

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `competitor` | `string` | **Sí** | Nombre del competidor (sin "vs.") |
| `testId` | `string` | No | `data-testid` en el host |

Renderiza el patrón `vs. X:` + descripción proyectada. Uso: dentro de `app-section variant="info"`.

### `app-tier-section`

```html
<app-tier-section
  testId="card-7-tier-2"
  badgeColor="amber"
  badgeTestId="badge-7-2"
  badgeText="FASE 2"
  tierDescription="4–15 personas · descripción"
  listTestId="card-7-list-2">
  <app-list-item>Restaurantes</app-list-item>
</app-tier-section>
```

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `badgeColor` | `BadgeColor` | **Sí** | color del badge |
| `badgeText` | `string` | **Sí** | texto del badge |
| `badgeTestId` | `string` | **Sí** | `data-testid` del badge |
| `tierDescription` | `string` | **Sí** | descripción del segmento |
| `listTestId` | `string` | **Sí** | `data-testid` de la lista |
| `testId` | `string` | No | `data-testid` en el host |

Encapsula el patrón badge + descripción + lista. Proyecta `app-list-item` elementos.

### `app-stat-row`

```html
<app-stat-row label="Suscripción mensual" value="S/ 99" variant="highlighted" testId="sr-1" />
```

| Input | Tipo | Requerido | Valores |
|---|---|---|---|
| `label` | `string` | **Sí** | texto de la etiqueta |
| `value` | `string` | **Sí** | valor a mostrar |
| `variant` | `StatRowVariant` | No (`'default'`) | `'default'` · `'highlighted'` · `'ai'` |
| `testId` | `string` | No | `data-testid` |

Variantes de color del valor: **default** → `#e2e8f0` · **highlighted** → `#4ade80` · **ai** → `#f9a8d4`

### `app-page-header`

```html
<app-page-header emoji="🌳" title="Árbol Evolutivo" subtitle="Descripción opcional" testId="header-1" />
```

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `emoji` | `string` | **Sí** | emoji de la página |
| `title` | `string` | **Sí** | título principal |
| `subtitle` | `string` | No | descripción bajo el título |
| `testId` | `string` | No | `data-testid` |

Uso: encabezado estándar para todas las rutas de features.

### `app-empty-state`

```html
<app-empty-state emoji="🚧" title="Próximamente" description="Esta sección está en construcción." />
```

| Input | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | `string` | **Sí** | título del estado vacío |
| `emoji` | `string` | No (`'🚧'`) | emoji decorativo |
| `description` | `string` | No | texto explicativo |
| `testId` | `string` | No | `data-testid` |

Uso: placeholder para rutas no implementadas (`/tree`, `/ai`, `/triggers`, `/pricing`).

---

## Cómo añadir un componente nuevo

```bash
# 1. Crear en shared/components/{nombre}/
src/app/shared/components/
  {nombre}/
    {nombre}.component.ts     # standalone, Tailwind, CDK
    {nombre}.component.spec.ts

# 2. Template: solo clases Tailwind, sin <style>
# 3. Comportamiento: solo Angular CDK
# 4. data-testid en cada parte del componente
# 5. Actualizar la tabla de catálogo en este archivo
```

---

## Testing de componentes del design system

Los tests verifican **clases Tailwind** vía `data-testid`, no valores CSS computados (jsdom no computa estilos externos).

```typescript
it('card title has correct color class', () => {
  const title = el.querySelector('[data-testid="card-1-title"]') as HTMLElement;
  expect(title.className).toContain('text-[#a78bfa]');
});

it('card title has correct font size class', () => {
  expect(title.className).toContain('text-[0.72rem]');
  expect(title.className).toContain('uppercase');
  expect(title.className).toContain('tracking-[1px]');
});

it('card title has print font size class', () => {
  expect(title.className).toContain('print:text-[8px]');
});
```
