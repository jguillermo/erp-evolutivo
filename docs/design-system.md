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

## Sistema de espaciado

**Un solo archivo para gobernarlos todos: `spacing.js` en la raíz del proyecto.**

La escala usa claves semánticas de letras (`nano`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`) que se añaden a la escala estándar de Tailwind vía `theme.extend.spacing`. Las claves de letras son inconfundibles con los valores numéricos de Tailwind.

Para cambiar el espaciado global, edita los valores en `spacing.js`. Todos los componentes se actualizan automáticamente.

### Escala semántica

| Token | Valor | Uso principal |
|---|---|---|
| `nano` | 1 px | Bordes hairline, padding micro print (1.5 px se normaliza aquí) |
| `xs` | 2 px | Separación mínima, `mb` entre elementos adyacentes |
| `sm` | 4 px | Gap de iconos, padding badge, filas compactas (3 px → aquí) |
| `md` | 6 px | Gap estándar, padding de badge secundario (5 px → aquí) |
| `lg` | 8 px | Padding de componentes, gap de lista (7 px y 9 px → aquí) |
| `xl` | 12 px | Padding mayor, sangría de listas (10 px → aquí) |
| `2xl` | 16 px | Padding de card, padding de página |
| `3xl` | 20 px | Padding de sección grande |
| `4xl` | 24 px | Margen de layout |
| `5xl` | 40 px | Espaciado de nivel de página |

En HTML: `py-nano` · `px-sm` · `gap-md` · `mb-lg` · `p-xl` · `px-2xl` · `mb-4xl`

### Reglas

1. **Nunca** clases numéricas de Tailwind (`p-3`, `mb-4`, `gap-2`, `px-1.5`) ni valores arbitrarios (`px-[6px]`).
2. **Usar siempre** los tokens semánticos: `py-sm`, `px-md`, `gap-lg`, `p-xl`, `mb-2xl`, etc.
3. Para cambiar el espaciado globalmente, editar **solo** `spacing.js`.

---

## Sistema de tipografía

**Un solo archivo para gobernarlos todos: `typography.js` en la raíz del proyecto.**

Para cambiar la fuente principal de Inter a Geist:
```js
// typography.js
const fontSans = ['Geist', 'system-ui', 'sans-serif']   // ← cambio aquí
```

Para ajustar el tamaño base de todo el cuerpo:
```js
// typography.js
'base': ['1.0625rem', { lineHeight: '1.5rem' }],         // ← cambio aquí
```

### Fuentes

| Token | Familia | Uso |
|---|---|---|
| `font-sans` | Inter → system-ui | Texto por defecto en toda la app |
| `font-display` | (alias de `font-sans`) | Headings — apuntar a una display font si se requiere |
| `font-mono` | JetBrains Mono → Fira Code | Código, valores técnicos |

### Escala de tamaños

`fontSize` reemplaza la escala por defecto de Tailwind. Usar **siempre** estos tokens semánticos; nunca valores arbitrarios `text-[0.72rem]`.

| Token | Tamaño | Uso |
|---|---|---|
| `text-2xs` | 0.625 rem / 10 px | Micro badges, timestamps, anotaciones |
| `text-xs` | 0.72 rem / 11.5 px | Labels de tarjeta, tags, encabezados compactos |
| `text-sm` | 0.8 rem / 12.8 px | Texto secundario, descripciones cortas |
| `text-md` | 0.875 rem / 14 px | Cuerpo compacto, subtítulos de sección |
| `text-base` | 1 rem / 16 px | Cuerpo estándar |
| `text-lg` | 1.125 rem / 18 px | Subencabezados, títulos de estado vacío |
| `text-xl` | 1.25 rem / 20 px | Encabezados de página (`page-header` title) |
| `text-2xl` | 1.5 rem / 24 px | Títulos de sección prominente |
| `text-3xl` | 1.875 rem / 30 px | Títulos de página principal |
| `text-4xl` | 2.25 rem / 36 px | Display grande |
| `text-5xl` | 3 rem / 48 px | Hero, splash |

#### Tokens print

Usar con el variant `print:` → `print:text-print-sm`

| Token | Tamaño | Equivalente pantalla |
|---|---|---|
| `text-print-2xs` | 5.5 px | `text-2xs` |
| `text-print-xs` | 6.5 px | `text-xs` |
| `text-print-sm` | 8 px | `text-sm` / `text-md` |
| `text-print-md` | 9 px | `text-md` |
| `text-print-base` | 10 px | `text-base` |

### Reglas

1. **Nunca** valores arbitrarios de tamaño (`text-[0.72rem]`, `text-[14px]`) en templates.
2. **Usar siempre** tokens semánticos: `text-xs`, `text-md`, `text-base`, `text-xl`, etc.
3. Para print, usar `print:text-print-sm` en lugar de `print:text-[8px]`.
4. Para cambiar tamaños globalmente, editar **solo** `typography.js`.

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

### Tokens de estado interactivo

Estandarizan el aspecto de todos los elementos interactivos. Definidos en `colors.js` referenciando los tokens de superficie — cambiar una superficie actualiza todos los estados.

| Token | Valor base | Uso |
|---|---|---|
| `bg-state-hover` | `surface-raised` (#242838) | Fila / ítem al pasar el cursor |
| `bg-state-active` | `surface-overlay` (#2d3148) | Elemento al presionar / click |
| `bg-state-selected` | `primary-900` (#1e1b4b) | Ítem seleccionado / activo en lista |
| `bg-state-disabled` | `surface-dark` (#0f1117) | Elemento no interactivo |

En HTML: `hover:bg-state-hover` · `active:bg-state-active` · `bg-state-selected` · `bg-state-disabled`

### Reglas

1. **Nunca** valores hex sueltos (`#6366f1`, `rgba(...)`) en templates ni constantes de componente.
2. **Usar siempre** aliases semánticos: `primary-500` en vez de `indigo-500`.
3. Las constantes de componente (`CARD_COLORS`, `BADGE_COLORS`, etc.) siguen existiendo para que Tailwind JIT las detecte, pero ya referencian tokens nombrados.
4. Para opacidad usa la sintaxis `/`: `bg-primary-500/20`, `border-success-500/30`.
5. Para estados interactivos, usar siempre `bg-state-*` en lugar de implementar hover/active ad-hoc por componente.

---

## Sistema de sombras

**Un solo archivo para gobernarlos todos: `shadows.js` en la raíz del proyecto.**

Escala semántica de elevación basada en el color de base (`#0f1117`) con opacidades crecientes. Para cambiar el tinte global, editar solo `shadows.js`.

| Token | Opacidad | Uso |
|---|---|---|
| `shadow-card` | 50% | Tarjetas, paneles con elevación sutil |
| `shadow-raised` | 60% | Dropdowns, tooltips, elementos flotantes |
| `shadow-overlay` | 75% | Modales, drawers, sheets |

En HTML: `shadow-card` · `shadow-raised` · `shadow-overlay`

### Reglas

1. **Nunca** valores `box-shadow` arbitrarios en templates.
2. **Usar siempre** los tres tokens semánticos según el nivel de elevación del elemento.

---

## Sistema de radio de borde

**Un solo archivo para gobernarlos todos: `radius.js` en la raíz del proyecto.**

Se añade sobre la escala estándar de Tailwind (`rounded`=4px, `rounded-md`=6px). Usar siempre estos tokens; nunca valores arbitrarios `rounded-[10px]`.

| Token | Valor | Uso |
|---|---|---|
| `rounded-badge` | 3 px | Badges inline, tags pequeños |
| `rounded-card` | 10 px | Tarjetas principales, paneles |
| `rounded-panel` | 14 px | Modales, drawers, sheets grandes |

En HTML: `rounded-badge` · `rounded-card` · `rounded-panel`

---

## Breakpoints

**Un solo archivo para gobernarlos todos: `screens.js` en la raíz del proyecto.**

Reemplaza la escala estándar de Tailwind con breakpoints orientados a ERP de escritorio.

| Token | Valor | Dispositivo objetivo |
|---|---|---|
| `sm` | 640 px | Tablet / móvil landscape |
| `md` | 1024 px | Laptop estándar |
| `lg` | 1280 px | Desktop |
| `xl` | 1440 px | Desktop grande |
| `2xl` | 1920 px | Ultrawide |

En HTML: `sm:px-0` · `md:grid-cols-2` · `lg:grid-cols-3` · `xl:gap-xl`

---

## Convenciones de template

```html
<!-- ✅ Correcto -->
<div class="bg-surface border border-line rounded-card p-xl">

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

Usar el variant `print:` de Tailwind para todas las reglas de impresión. Usar siempre tokens semánticos — nunca valores arbitrarios:

```html
<h3 class="text-xs   print:text-print-sm">
<p  class="text-2xs  print:text-print-xs">
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

Proyecta contenido en un `<p>` con `border-l-2 border-accent-300 italic`. Uso: frases de posicionamiento, citas estratégicas.

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

Variantes: **title** → `text-warning-100 font-bold` · **description** → `text-ink-muted`

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

Variantes de color del valor: **default** → `text-ink` · **highlighted** → `text-success-400` · **ai** → `text-ai-300`

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
  expect(title.className).toContain('text-ai-400');
});

it('card title has correct font size class', () => {
  expect(title.className).toContain('text-xs');
  expect(title.className).toContain('uppercase');
  expect(title.className).toContain('tracking-title');
});

it('card title has print font size class', () => {
  expect(title.className).toContain('print:text-print-sm');
});
```
