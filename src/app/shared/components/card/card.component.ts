import { Component, computed, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FocusMonitor } from '@angular/cdk/a11y';

// All color tokens live here — change a token, all cards using it update automatically
export const CARD_COLORS = {
  purple:  { bar: 'from-ai-500 to-ai-600',         title: 'text-ai-400'      },
  indigo:  { bar: 'from-primary-500 to-primary-600', title: 'text-primary-400' },
  blue:    { bar: 'from-info-500 to-info-600',       title: 'text-info-400'    },
  cyan:    { bar: 'from-accent-500 to-accent-600',   title: 'text-accent-400'  },
  green:   { bar: 'from-success-500 to-success-600', title: 'text-success-400' },
  teal:    { bar: 'from-teal-500 to-teal-600',       title: 'text-teal-400'    },
  amber:   { bar: 'from-warning-500 to-warning-600', title: 'text-warning-400' },
  red:     { bar: 'from-danger-500 to-danger-600',   title: 'text-danger-400'  },
  emerald: { bar: 'from-green-500 to-green-600',     title: 'text-green-400'   },
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
               print:rounded-md print:px-lg print:py-md print:break-inside-avoid"
         cdkMonitorSubtreeFocus>

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
        class="text-2xs text-gray-500 italic mb-lg pb-md
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

  protected readonly focusMonitor = inject(FocusMonitor);
}
