import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All color tokens live here — Tailwind JIT detects them via static scan of this file
export const STAT_ROW_STYLES = {
  default:     { label: 'text-[0.65rem] text-slate-400', value: 'text-[0.78rem] font-bold text-slate-200' },
  highlighted: { label: 'text-[0.65rem] text-slate-400', value: 'text-[0.78rem] font-bold text-green-400' },
  ai:          { label: 'text-[0.65rem] text-slate-400', value: 'text-[0.78rem] font-bold text-pink-300' },
} as const;

export type StatRowVariant = keyof typeof STAT_ROW_STYLES;

@Component({
  selector: 'app-stat-row',
  standalone: true,
  imports: [NgClass],
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'flex items-center justify-between gap-2 py-[3px]',
  },
  template: `
    <span [ngClass]="styles().label">{{ label() }}</span>
    <span [ngClass]="styles().value">{{ value() }}</span>
  `,
})
export class StatRowComponent {
  readonly testId  = input<string>();
  readonly label   = input.required<string>();
  readonly value   = input.required<string>();
  readonly variant = input<StatRowVariant>('default');

  readonly styles = computed(() => STAT_ROW_STYLES[this.variant()]);
}
