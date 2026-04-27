import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All hex values here for Tailwind JIT detection
export const STAT_ROW_STYLES = {
  default:     { label: 'text-[0.65rem] text-[#94a3b8]', value: 'text-[0.78rem] font-bold text-[#e2e8f0]' },
  highlighted: { label: 'text-[0.65rem] text-[#94a3b8]', value: 'text-[0.78rem] font-bold text-[#4ade80]' },
  ai:          { label: 'text-[0.65rem] text-[#94a3b8]', value: 'text-[0.78rem] font-bold text-[#f9a8d4]' },
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
