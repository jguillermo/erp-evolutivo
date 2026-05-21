import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All color tokens live here — usan tokens semánticos (fg/tint/line) que cambian
// automáticamente entre modo oscuro y modo claro vía CSS variables.
// Niveles de intensidad:
//   tint-soft  → más sutil (CANAL #3, SECUNDARIO)
//   tint       → estándar (CANAL #2, FUTURO)
//   tint-strong → más prominente (CANAL #1, PRINCIPAL)
export const BADGE_COLORS = {
  'indigo':       'text-2xs px-sm mr-sm bg-primary-tint text-primary-fg border border-primary-line',
  'slate':        'text-2xs px-sm mr-sm bg-neutral-tint text-neutral-fg border border-neutral-line',
  'teal-hi':      'text-2xs px-sm mr-sm bg-teal-tint-strong text-teal-fg border border-teal-line',
  'teal-mid':     'text-2xs px-sm mr-sm bg-teal-tint text-teal-fg border border-teal-line',
  'teal-lo':      'text-2xs px-sm mr-sm bg-teal-tint-soft text-teal-fg border border-teal-line',
  'red':          'text-2xs px-sm mr-sm bg-danger-tint text-danger-fg border border-danger-line',
  'orange':       'text-2xs px-sm mr-sm bg-orange-tint text-orange-fg border border-orange-line',
  'green-hi':     'text-2xs px-sm mr-sm bg-success-tint text-success-fg border border-success-line',
  'green-lo':     'text-2xs px-sm mr-sm bg-success-tint-soft text-success-fg border border-success-line',
  'pink':         'text-2xs px-sm mr-sm bg-pink-tint text-pink-fg border border-pink-line',
  'amber-solid':  'text-2xs px-md bg-warning-solid-bg text-warning-solid-fg',
  'amber':        'text-2xs px-md bg-warning-tint text-warning-fg border border-warning-line',
  'orange-dim':   'text-2xs px-md bg-orange-tint text-orange-fg border border-orange-line',
} as const;

export type BadgeColor = keyof typeof BADGE_COLORS;

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  host: {
    '[attr.data-testid]': 'testId()',
    'class': 'inline',
  },
  template: `
    <span class="inline-block font-bold tracking-badge rounded-badge py-nano whitespace-nowrap print:text-print-2xs"
          [ngClass]="styles()">
      <ng-content />
    </span>
  `,
})
export class BadgeComponent {
  readonly testId = input.required<string>();
  readonly color  = input.required<BadgeColor>();
  readonly styles = computed(() => BADGE_COLORS[this.color()]);
}
