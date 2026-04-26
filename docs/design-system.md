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
| `AlertComponent` | `app-alert` | 🔲 Pendiente | `Overlay`, `A11yModule` |
| `BadgeComponent` | `app-badge` | 🔲 Pendiente | — |
| `ButtonComponent` | `app-button` | 🔲 Pendiente | `FocusMonitor` |
| `TooltipComponent` | `app-tooltip` | 🔲 Pendiente | `Overlay` |

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
