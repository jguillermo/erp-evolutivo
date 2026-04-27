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

## Tokens de color

Definidos en `tailwind.config.js` → `theme.extend.colors`. Nunca valores hex sueltos en los templates.

```js
// tailwind.config.js
colors: {
  base:          '#0f1117',
  surface:       '#1a1d27',
  'surface-dark':'#0f1117',
  border:        '#2a2d3a',
  'border-hover':'#4a4d5a',
  muted:         '#888',
  'text-base':   '#e0e0e0',
  'text-muted':  '#b0b3c0',
  'ai-pink':     '#f9a8d4',
  'ai-purple':   '#c084fc',
  'ai-violet':   '#9333ea',
}
```

Los colores específicos de componentes (gradientes de card, badges de fase, etc.) se definen como constantes TypeScript en el propio componente (`CARD_COLORS`, `BADGE_COLORS`, etc.) para que Tailwind JIT los detecte en el escaneo de `.ts`.

---

## Convenciones de template

```html
<!-- ✅ Correcto -->
<div class="bg-surface border border-border rounded-[10px] p-3">

<!-- ❌ Incorrecto — nunca estilos inline para diseño -->
<div style="background:#1a1d27; border:1px solid #2a2d3a">

<!-- ❌ Incorrecto — nunca bloques <style> en templates -->
<style>.canvas-block { ... }</style>
```

**Excepción única permitida**: `[style.gridColumn]` / `[style.gridRow]` para posicionamiento en CSS Grid cuando Tailwind no puede expresar el valor dinámicamente (p.ej. `1/3`, `6/11`).

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
- **info** → fondo cyan tenue (comparaciones, info)
- **callout** → fondo violeta + borde (mecánicas, módulos destacados)
- **highlight** → fondo ámbar + borde fuerte (beachhead, destacados)

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
