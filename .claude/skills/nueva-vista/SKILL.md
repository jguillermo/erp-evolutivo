---
name: nueva-vista
description: Scaffolds una nueva vista del ERP Evolutivo a partir de documentación o contenido en bruto que el usuario pega. Genera data/data-<num>-<slug>.json (texto plano + markdown inline, prefijo numérico que respeta el outline del proyecto), el componente Angular standalone con tokens semánticos, la plantilla HTML, y registra la ruta lazy-load. Reutiliza los shared components existentes (card, list, section, badge, quoted-text, comparison-row, tier-section, badge-label, alert, page-header, stat-row, empty-state, tooltip, button) y propone crear uno nuevo si el contenido no encaja. Trigger cuando el usuario pide "crear vista", "nueva vista", "nueva sección", "nueva pestaña", "nueva página", "scaffold vista", "añadir vista", "nueva parte del proyecto", "documenta esta nueva sección".
---

# Skill: nueva-vista

Convierte documentación textual (markdown, copy/paste, briefing) en una vista
completa del ERP Evolutivo: JSON de datos + componente + template + ruta
registrada. Sigue al pie las reglas de `CLAUDE.md` y `docs/design-system.md`.

> **Paths en este SKILL son relativos a la raíz del repo** (`erp-evolutivo/`),
> NO al directorio del skill.

---

## Antes de tocar código — preguntar SIEMPRE

Antes de generar ningún archivo, hay que resolver **cuatro** cosas con
`AskUserQuestion`. No las inventes ni las deduzcas — preguntar.

1. **¿Dónde cuelga la nueva vista?**
   - Top-level (`/<slug>`, aparece como pestaña en el header de `app.ts`)
   - Dentro de un grupo existente — actualmente `analisis-estrategico/` o
     `estudio-mercado/` (`/<grupo>/<slug>`)
   - Nuevo grupo a crear (`/<grupo>/<slug>` — confirmar nombre del grupo)

2. **¿Cuál es el `slug` (path segment, kebab-case) y el nombre humano de la
   vista?** Ej: slug `porter`, nombre `5 Fuerzas de Porter`. Pedir también un
   emoji (los usa el header y, normalmente, el `<app-card>` raíz).

3. **¿Qué número de sección del outline le corresponde?** Es el prefijo que
   ordena el JSON dentro del MD unificado. Ver la tabla **Outline del
   proyecto** justo debajo. El número va a quedar embebido en el filename
   como `data/data-<num>-<slug>.json` (ej: `data-1.1.1-pestel.json`).

4. **¿Visible en navegación?** Si es top-level, ¿añadimos pestaña al header
   (`tabs` en `src/app/app.ts`) ahora o se deja oculta (`visible: false`)?

Si la documentación que pegó el usuario menciona estructuras que no encajan
con los shared components existentes (tabla densa, gráfico, formulario, etc.),
**parar y preguntar antes de seguir**: "Esto necesita un nuevo shared
component `<nombre>`, ¿lo creo primero?". No improvisar markup ad-hoc en la
vista — todo elemento visual reutilizable vive en
`src/app/shared/components/`.

---

## Outline del proyecto y prefijo numérico del JSON

El proyecto académico tiene una estructura de capítulos fija. El **filename
del JSON lleva un prefijo numérico** (`data-<num>-<slug>.json`) que determina
el orden en `public/erp-evolutivo.md` — el script `scripts/build-docs.mjs`
hace `readdirSync().sort()` y concatena, así que el orden lexicográfico del
filename es el orden en el doc unificado.

| Sección | Filename canónico |
|---|---|
| (overview — Business Model Canvas) | `data-0-canvas.json` |
| 1. CAPÍTULO I · ESTUDIO ESTRATÉGICO | _(no JSON propio, índice)_ |
| 1.1 Análisis Externo — PESTEL (Macroentorno) | `data-1.1.1-pestel.json` |
| 1.1 Análisis Externo — Porter (Microentorno) | `data-1.1.2-porter.json` |
| 1.2 Análisis Interno | `data-1.2-analisis-interno.json` |
| 1.3 Matrices EFI & EFE | `data-1.3-efi-efe.json` |
| 1.4 Factores Críticos de Éxito | `data-1.4-fce.json` |
| 1.5 Planeamiento Estratégico — Misión, Visión, Valores | `data-1.5.1-mision-vision-valores.json` |
| 1.5 — Responsabilidad Social Empresarial | `data-1.5.2-rse.json` |
| 1.5 — Matriz FODA cruzada | `data-1.5.3-foda.json` |
| 1.5 — Matriz PEYEA | `data-1.5.4-peyea.json` |
| 1.5 — Estrategias globales del negocio | `data-1.5.5-estrategias.json` |
| 2. CAPÍTULO II · ESTUDIO DE MERCADO | _(índice)_ |
| 2.1.1 Características del mercado | `data-2.1.1-mercado-objetivo-caracteristicas.json` |
| 2.1.3 Selección de zonas geográficas | `data-2.1.3-<slug>.json` |
| 2.2.1 Perfil del consumidor | `data-2.2.1-<slug>.json` |
| 2.2.2 Segmentación del mercado objetivo | `data-2.2.2-<slug>.json` |
| 2.3 Análisis de la Demanda | `data-2.3-<slug>.json` |
| 2.4 Análisis de la Oferta | `data-2.4-<slug>.json` |
| 2.5 Demanda del Proyecto | `data-2.5-<slug>.json` |
| 2.6 Marketing Mix — Producto | `data-2.6.1-<slug>.json` |
| 2.6 — Estrategia de Precio | `data-2.6.2-<slug>.json` |
| 2.6 — Estrategia de Distribución | `data-2.6.3-<slug>.json` |
| 2.6 — Estrategia de Promoción | `data-2.6.4-<slug>.json` |

**Reglas del prefijo:**

- Mismo nivel del outline → mismo prefijo (1.1, 2.6, etc.). Si una sección del
  outline tiene varias sub-vistas sin numeración propia (ej. 1.1 con PESTEL +
  Porter), inventar sub-índice (`1.1.1`, `1.1.2`) **manteniendo el orden del
  outline original**.
- El `.json` debe encajar limpio entre sus vecinos lexicográficos. Verificar
  con `ls data/ | sort` antes de cerrar.
- Si llegan a hacer falta **≥10 ítems en un mismo nivel** (ej. `1.5.10`), hay
  que **zero-paddear todo ese nivel** (`1.05.10`, `1.05.01`…) para que el
  sort lexicográfico mantenga el orden numérico. Hoy no aplica.
- Filename siempre en kebab-case, dots solo dentro del número. Ej:
  `data-2.6.1-marketing-mix-producto.json`, no
  `data-2-6-1-marketing-mix-producto.json` ni `data-261-producto.json`.
- **El número del prefijo NO aparece en la ruta de Angular ni en el slug
  visible.** La ruta sigue siendo `/estudio-mercado/<slug>` y el slug del
  componente sigue siendo `<slug>` sin número.

---

## Catálogo de shared components disponibles

Inventario rápido — para detalles ver `docs/design-system.md` y leer el
`.component.ts` de cada uno (los inputs son `input.required<T>()` /
`input<T>()`):

| Selector | Para qué sirve |
|---|---|
| `app-card` | Tarjeta principal con bar de color, título, emoji y pregunta. 9 colores: `purple`/`indigo`/`blue`/`cyan`/`green`/`teal`/`amber`/`red`/`emerald`. |
| `app-list` + `app-list-item` | Lista con bullets ▸. Items pueden incluir `<app-badge>` y prefijos `<span class="hl">…</span>`. |
| `app-section` | Bloque tintado dentro de card. Variantes: `note` · `info` · `callout` · `highlight` · `feature`. |
| `app-quoted-text` | Cita destacada con barra izquierda accent (intro de página). |
| `app-badge` | Pill inline. 13 colores: `indigo`/`slate`/`teal-hi`/`teal-mid`/`teal-lo`/`red`/`orange`/`green-hi`/`green-lo`/`pink`/`amber-solid`/`amber`/`orange-dim`. |
| `app-badge-label` | Badge + texto al lado. Variantes `title` (resaltado warning) / `description`. |
| `app-comparison-row` | Fila `vs. {competitor}: {texto}` para tablas comparativas. |
| `app-tier-section` | Sección con badge-label de descripción + lista (tiers / fases). |
| `app-button` | Botón. Variantes `primary` / `secondary` / `ghost`, tamaños `sm`/`md`/`lg`. |
| `app-alert` | Banner `info`/`success`/`warning`/`error` con icono y opcional dismiss. |
| `app-page-header`, `app-empty-state`, `app-stat-row`, `app-tooltip` | Ver el `.ts` correspondiente. |

**Reutilizar siempre antes de crear.** Si falta una primitiva visual, crear un
nuevo componente standalone en `src/app/shared/components/<nombre>/` siguiendo
el patrón de los existentes (signals, tokens semánticos, spec.ts con
`data-testid` checks).

---

## La regla maestra: separar datos de presentación

Toda vista del proyecto se compone de **dos artefactos siempre**:

1. **`data/data-<num>-<slug>.json`** — único origen del texto. Plano +
   markdown inline. El **prefijo `<num>`** sale del outline (ver tabla
   arriba) y es el que define en qué orden aparece la sección en el MD
   unificado. **PROHIBIDO**: HTML, clases Tailwind, nombres de color,
   `testId`, IDs de componente. Las etiquetas semánticas que aparecen en
   pantalla (`FASE 1`, `CANAL #1`, `PRINCIPAL`, `BEACHHEAD`, etc.) sí van en
   el JSON; el color con que se renderizan lo decide el componente.

2. **`src/app/features/<grupo>/<slug>/<slug>.component.{ts,html}`** —
   importa el JSON, declara las interfaces TypeScript del shape, mapea
   identificadores semánticos a tokens semánticos de color, y renderiza
   iterando con `@for` / `@switch`. El nombre de la carpeta y del componente
   sigue siendo `<slug>` sin el prefijo numérico.

Si la nueva vista cuelga directo del root y no de un grupo, va en
`src/app/features/<slug>/<slug>.component.{ts,html}`.

---

## Subset markdown soportado en JSON

El `MarkdownPipe` (`src/app/shared/pipes/markdown.pipe.ts`) entiende **solo
estas marcas inline**:

| Marca | Renderiza | Color |
|---|---|---|
| `**texto**` | `<strong class="hl">` | `text-ai-fg` (violeta) por defecto |
| `*texto*` | `<em>` | sin cambio de color |
| `~~texto~~` | `<del>` | sin cambio de color |
| `` `texto` `` | `<code>` | monoespaciado |

Variantes de color para la negrita: `| md:'ai'` (`hl-ai` rosa), `| md:'hl2'`
(`hl2` cyan), `| md:'hl3'` (`hl3` verde).

**Nunca** otros constructos markdown (headings, listas con `-`, links
`[x](y)`, etc.) — la estructura va en la jerarquía del JSON, no en marcas.

---

## Colores — SOLO tokens semánticos

Todo color que ponga el componente o el template debe ser un token semántico
por familia. Las escalas crudas (`text-warning-400`, `bg-warning-400/[8%]`,
`text-slate-200`, `text-white`, `border-success-500/30`) **rompen en modo
claro** y están prohibidas. Tabla de referencia:

| Rol | Cuándo |
|---|---|
| `text-{family}-fg` | Texto enfatizado (badges, títulos card) |
| `text-{family}-fg-strong` | Énfasis más fuerte (títulos highlight) |
| `text-{family}-fg-soft` | Énfasis más suave |
| `bg-{family}-tint` | Fondo tintado estándar |
| `bg-{family}-tint-strong` | Fondo tintado pronunciado |
| `bg-{family}-tint-soft` | Fondo tintado muy sutil |
| `border-{family}-line` | Borde de la familia |

Familias: `primary` · `accent` · `success` · `warning` · `danger` · `info` ·
`ai` · `teal` · `neutral` · `pink` · `orange`.

Para texto neutro: `text-ink` · `text-ink-muted` · `text-ink-subtle`.
Si necesitas un matiz que no existe → añadir CSS var en **AMBOS** modos
(`:root` y `html.light` en `src/styles.css`), exponer en `tokens/colors.js`,
documentar en `docs/design-system.md`. Nunca inline un hex puntual.

---

## Procedimiento — 6 pasos

### 1. Leer la documentación que pegó el usuario

Identificar bloques: secciones de nivel 1, listas, comparaciones, citas,
notas, callouts. Mapear cada bloque a un shared component existente. Si algo
no encaja → preguntar (ver "Antes de tocar código").

### 2. Confirmar ubicación con AskUserQuestion

Las **cuatro** preguntas obligatorias de arriba — incluida la del número de
sección del outline que se convierte en prefijo del filename JSON.

### 3. Crear `data/data-<num>-<slug>.json`

Estructura recomendada — ajustar según el contenido real:

```json
{
  "title": "<Título humano con emoji opcional>",
  "subtitle": "<Subtítulo / pregunta guía>",
  "backLink": { "label": "← <Grupo padre>", "route": "/<grupo>" },
  "intro": "<Cita o framing inicial. **Marca con negrita** lo importante.>",
  "<seccionesUOtroNombreSemantico>": [
    {
      "id": "<slug-de-la-seccion>",
      "title": "<Título>",
      "emoji": "🏛️",
      "question": "<Pregunta guía opcional>",
      "blocks": [
        { "type": "paragraph", "text": "Texto **con énfasis**." },
        { "type": "list", "items": ["Item con **clave**: descripción.", "..."] },
        { "type": "note", "text": "Nota corta." },
        { "type": "info", "text": "Info banner." },
        { "type": "implication", "title": "⚡ Implicancia", "text": "..." }
      ]
    }
  ],
  "synthesis": { "title": "...", "lead": "...", "items": [], "closing": "..." }
}
```

Reglas estrictas para el JSON:
- Solo texto plano + markdown inline (subset arriba).
- No `testId`. No clases. No nombres de color. No HTML.
- Las etiquetas semánticas (`FASE 1`, `CANAL #1`, `FIJO`, `PRINCIPAL`, etc.) van
  en campos dedicados (`tag`, `phase`, `kind`, …), nunca incrustadas en el
  texto.
- Convertir fechas relativas del briefing a absolutas.
- Strings UTF-8 con tildes correctas (no `&aacute;` ni `á`).

Referencias canónicas a copiar el shape: `data/data-0-canvas.json` (cards
heterogéneas con shapes distintos por id) y `data/data-1.1.1-pestel.json`
(factores con `blocks` tipados — preferir este patrón si los bloques son
homogéneos).

### 4. Crear el componente

`src/app/features/<grupo>/<slug>/<slug>.component.ts`:

```ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // si hay backLink
import { CardComponent, CardColor } from '../../../shared/components/card/card.component';
import { ListComponent } from '../../../shared/components/list/list.component';
import { ListItemComponent } from '../../../shared/components/list/list-item.component';
import { SectionComponent, SectionVariant } from '../../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../../shared/components/quoted-text/quoted-text.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import data from '../../../../../data/data-<num>-<slug>.json';

type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'info'; text: string }
  | { type: 'implication'; title: string; text: string };

interface Section {
  id: string;
  title: string;
  emoji: string;
  question: string;
  blocks: Block[];
}

const SECTION_COLORS: Record<string, CardColor> = {
  // mapear cada id de sección al color de card. Familia disponible:
  // 'purple' | 'indigo' | 'blue' | 'cyan' | 'green' | 'teal' | 'amber' | 'red' | 'emerald'
};

const BLOCK_VARIANTS: Record<'note' | 'info' | 'implication', SectionVariant> = {
  note: 'note',
  info: 'info',
  implication: 'callout',
};

@Component({
  selector: 'app-<slug>',
  standalone: true,
  imports: [RouterLink, CardComponent, ListComponent, ListItemComponent, SectionComponent, QuotedTextComponent, MarkdownPipe],
  templateUrl: './<slug>.component.html',
})
export class <Slug>Component {
  protected readonly data = data;
  protected readonly sections = data.sections as Section[];

  protected sectionColor(id: string): CardColor {
    return SECTION_COLORS[id] ?? 'indigo';
  }

  protected sectionVariant(blockType: 'note' | 'info' | 'implication'): SectionVariant {
    return BLOCK_VARIANTS[blockType];
  }
}
```

Y `<slug>.component.html` — iterar la data. **Todo texto rich pasa por `| md`
con `[innerHTML]`**:

```html
<div class="max-w-screen-lg mx-auto">
  @if (data.backLink) {
    <a [routerLink]="data.backLink.route"
       class="inline-flex items-center gap-sm text-xs text-ink-subtle hover:text-ink-muted no-underline transition-colors mb-2xl">
      {{ data.backLink.label }}
    </a>
  }

  <h2 class="text-2xl font-display font-extrabold text-ink mb-sm" data-testid="<slug>-title">
    {{ data.title }}
  </h2>
  <p class="text-md text-ink-muted leading-body mb-4xl" data-testid="<slug>-subtitle">
    {{ data.subtitle }}
  </p>

  @if (data.intro) {
    <app-quoted-text class="mb-4xl" testId="<slug>-intro">
      <span [innerHTML]="data.intro | md"></span>
    </app-quoted-text>
  }

  <div class="flex flex-col gap-3xl" data-testid="<slug>-sections">
    @for (section of sections; track section.id) {
      <app-card
        [testId]="'<slug>-' + section.id"
        [color]="sectionColor(section.id)"
        [title]="section.title"
        [emoji]="section.emoji"
        [question]="section.question">
        @for (block of section.blocks; track $index) {
          @switch (block.type) {
            @case ('paragraph') {
              <p class="text-xs text-ink-muted leading-body mb-lg" [innerHTML]="block.text | md"></p>
            }
            @case ('list') {
              <app-list [testId]="'<slug>-' + section.id + '-list-' + $index">
                @for (item of block.items; track $index) {
                  <app-list-item><span [innerHTML]="item | md"></span></app-list-item>
                }
              </app-list>
            }
            @case ('note') {
              <app-section [variant]="sectionVariant('note')" class="mt-lg">
                <span [innerHTML]="block.text | md"></span>
              </app-section>
            }
            @case ('info') {
              <app-section [variant]="sectionVariant('info')" class="mt-lg">
                <span [innerHTML]="block.text | md"></span>
              </app-section>
            }
            @case ('implication') {
              <app-section [variant]="sectionVariant('implication')" [title]="block.title" class="mt-lg">
                <p class="text-xs leading-body" [innerHTML]="block.text | md"></p>
              </app-section>
            }
          }
        }
      </app-card>
    }
  </div>
</div>
```

### 5. Registrar la ruta

Editar `src/app/app.routes.ts` — siempre **lazy-loaded**:

```ts
// Si cuelga de grupo existente, añadir al children: del grupo:
{
  path: '<slug>',
  loadComponent: () =>
    import('./features/<grupo>/<slug>/<slug>.component').then(m => m.<Slug>Component),
  title: '<Título humano> — <Grupo>',
},

// Si es top-level, añadir al routes raíz antes del wildcard:
{
  path: '<slug>',
  loadComponent: () =>
    import('./features/<slug>/<slug>.component').then(m => m.<Slug>Component),
  title: '<Título humano> — ERP Evolutivo',
},
```

Si la vista es top-level y el usuario pidió tab visible, añadir entrada al
array `tabs` de `src/app/app.ts`:

```ts
{ label: '<Etiqueta>', route: '/<slug>', icon: '<emoji>', visible: true },
```

### 6. Verificar

Correr en este orden (no saltarse):

```bash
npm run build
npm test
```

Build debe pasar sin errores. Tests deben quedar en verde (el proyecto está en
`202 passed` antes de añadir la vista; al añadir una vista nueva sin specs el
contador queda igual). Si añades un nuevo shared component, también añade su
`*.component.spec.ts` con al menos los checks de host `data-testid` y clases
clave del template.

---

## Checklist final — no entregar hasta cumplir TODO

- [ ] Usuario confirmó ubicación, slug, nombre, emoji, **número de outline** y
      visibilidad de pestaña.
- [ ] `data/data-<num>-<slug>.json` existe, es texto plano + markdown inline,
      sin HTML, sin clases, sin `testId`, sin colores.
- [ ] `ls data/ | sort` ubica el archivo en la posición correcta del outline.
- [ ] Componente `.ts` con `standalone: true`, interfaces tipadas para el JSON,
      `MarkdownPipe` en `imports`, mapas semánticos para id→color.
- [ ] Template `.html` itera el JSON con `@for`/`@switch`, todo texto rich va
      por `[innerHTML]="x | md"`, cero clases con escalas crudas de color.
- [ ] Ruta registrada lazy-load en `app.routes.ts`. Si top-level visible, tab
      añadida en `app.ts`.
- [ ] `npm run build` ✅
- [ ] `npm test` ✅
- [ ] Si se creó nuevo shared component: spec del nuevo componente añadido.

---

## Prohibido (causa rechazo de la PR)

- `<span class="hl">…</span>` dentro del JSON → usar `**…**`.
- `text-{family}-300/400/500`, `bg-{family}-500/20`, `text-slate-200`,
  `text-white` en componente o template → usar tokens semánticos.
- `@Input()` / `@Output()` / `BehaviorSubject` → usar `input()` / `output()` /
  `signal()`.
- Ruta no lazy-load.
- Componente no `standalone`.
- **JSON sin prefijo numérico** (`data/<slug>.json` en lugar de
  `data/data-<num>-<slug>.json`) → rompe el orden del MD unificado.
- **Prefijo numérico inventado** que no encaja en el outline o se solapa con
  el de otra vista existente → verificar contra la tabla del outline antes
  de elegirlo.
- Saltarse `npm run build` / `npm test`.

---

## Patrones de referencia ya en el repo

- Vista con cards heterogéneas (cada card distinta) → `features/canvas/` +
  `data/data-0-canvas.json`.
- Vista con bloques homogéneos tipados (`paragraph` / `list` / `note` / `info`
  / `implication`) → `features/analisis-estrategico/pestel/` +
  `data/data-1.1.1-pestel.json`.
- Vista con intro metodológico + dimensiones + síntesis + hipótesis débiles →
  `features/estudio-mercado/mercado-objetivo-caracteristicas/` +
  `data/data-2.1.1-mercado-objetivo-caracteristicas.json`.
- Página índice que enlaza a subvistas → `features/analisis-estrategico/
  analisis-estrategico.component.html` y
  `features/estudio-mercado/estudio-mercado.component.html`.

Leer estos antes de generar la nueva vista — son el estándar.
