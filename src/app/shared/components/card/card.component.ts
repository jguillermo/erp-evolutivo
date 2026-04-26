import { Component, computed, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FocusMonitor } from '@angular/cdk/a11y';

// All hex values live here — change a token, all cards using it update automatically
export const CARD_COLORS = {
  purple:  { bar: 'from-[#8b5cf6] to-[#7c3aed]', title: 'text-[#a78bfa]' },
  indigo:  { bar: 'from-[#6366f1] to-[#4f46e5]', title: 'text-[#818cf8]' },
  blue:    { bar: 'from-[#3b82f6] to-[#2563eb]', title: 'text-[#60a5fa]' },
  cyan:    { bar: 'from-[#06b6d4] to-[#0891b2]', title: 'text-[#22d3ee]' },
  green:   { bar: 'from-[#10b981] to-[#059669]', title: 'text-[#34d399]' },
  teal:    { bar: 'from-[#14b8a6] to-[#0d9488]', title: 'text-[#2dd4bf]' },
  amber:   { bar: 'from-[#f59e0b] to-[#d97706]', title: 'text-[#fbbf24]' },
  red:     { bar: 'from-[#ef4444] to-[#dc2626]', title: 'text-[#f87171]' },
  emerald: { bar: 'from-[#22c55e] to-[#16a34a]', title: 'text-[#4ade80]' },
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
    <div class="relative overflow-hidden bg-surface border border-border rounded-[10px] p-3 h-full
               print:bg-white print:border-[#d1d5db]
               print:rounded-[6px] print:px-[8px] print:py-[6px] print:break-inside-avoid"
         cdkMonitorSubtreeFocus>

      <!-- Color bar -->
      <div
        class="absolute inset-x-0 top-0 h-[3px] rounded-t-[10px] bg-gradient-to-r
               print:h-[3px]"
        [ngClass]="colors().bar"
        [attr.data-testid]="testId() + '-bar'">
      </div>

      <!-- Title -->
      <h3
        class="text-[0.72rem] uppercase tracking-[1px] mb-2 flex items-center gap-[5px]
               print:text-[8px] print:mb-1"
        [ngClass]="colors().title"
        [attr.data-testid]="testId() + '-title'">
        <span aria-hidden="true">{{ emoji() }}</span>{{ title() }}
      </h3>

      <!-- Question -->
      <p
        class="text-[0.65rem] text-[#6b7280] italic mb-2 pb-[6px]
               border-b border-dashed border-[#2a2d3a]
               print:text-[#374151] print:border-[#cbd5e1]
               print:text-[6.5px] print:mb-1 print:pb-[3px]"
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
