import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All color tokens live here — usan tokens semánticos (fg/tint/line) que cambian
// automáticamente entre modo oscuro y modo claro vía CSS variables.
// La franja superior (from-/to-) conserva la escala 500/600 porque son tonos
// saturados que mantienen identidad y contraste en ambos modos.
export const CARD_COLORS = {
  purple:  { bar: 'from-ai-500 to-ai-600',           title: 'text-ai-fg'      },
  indigo:  { bar: 'from-primary-500 to-primary-600', title: 'text-primary-fg' },
  blue:    { bar: 'from-info-500 to-info-600',       title: 'text-info-fg'    },
  cyan:    { bar: 'from-accent-500 to-accent-600',   title: 'text-accent-fg'  },
  green:   { bar: 'from-success-500 to-success-600', title: 'text-success-fg' },
  teal:    { bar: 'from-teal-500 to-teal-600',       title: 'text-teal-fg'    },
  amber:   { bar: 'from-warning-500 to-warning-600', title: 'text-warning-fg' },
  red:     { bar: 'from-danger-500 to-danger-600',   title: 'text-danger-fg'  },
  emerald: { bar: 'from-success-500 to-success-600', title: 'text-success-fg' },
} as const;

export type CardColor = keyof typeof CARD_COLORS;

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  host: {
    '[attr.data-testid]': 'testId()',
    'class': 'block',
  },
  template: `
    <div class="relative overflow-hidden bg-surface border border-line rounded-card p-xl h-full
               print:rounded-md print:px-lg print:py-md print:break-inside-avoid">

      <!-- Color bar -->
      <div
        class="absolute inset-x-0 top-0 h-sm rounded-t-card bg-gradient-to-r
               print:h-sm"
        [ngClass]="colors().bar"
        [attr.data-testid]="testId() + '-bar'">
      </div>

      <!-- Title -->
      <h3
        class="text-xs uppercase tracking-title mb-lg flex items-center gap-md
               print:text-print-sm print:mb-sm"
        [ngClass]="colors().title"
        [attr.data-testid]="testId() + '-title'">
        <span aria-hidden="true">{{ emoji() }}</span>{{ title() }}
      </h3>

      <!-- Question -->
      <p
        class="text-2xs text-ink-subtle italic mb-lg pb-md
               border-b border-dashed border-line
               print:text-print-xs print:mb-sm print:pb-sm"
        [attr.data-testid]="testId() + '-question'">
        {{ question() }}
      </p>

      <!-- Projected content -->
      <ng-content />
    </div>
  `,
})
export class CardComponent {
  readonly testId  = input.required<string>();
  readonly title   = input.required<string>();
  readonly emoji   = input.required<string>();
  readonly question = input.required<string>();
  readonly color   = input.required<CardColor>();

  readonly colors = computed(() => CARD_COLORS[this.color()]);
}
