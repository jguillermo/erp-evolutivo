import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All color tokens live here — usan tokens semánticos que cambian automáticamente
// entre modo oscuro y modo claro vía CSS variables.
export const STAT_ROW_STYLES = {
  default:     { label: 'text-2xs text-ink-muted', value: 'text-sm font-bold text-ink' },
  highlighted: { label: 'text-2xs text-ink-muted', value: 'text-sm font-bold text-success-fg' },
  ai:          { label: 'text-2xs text-ink-muted', value: 'text-sm font-bold text-pink-fg' },
} as const;

export type StatRowVariant = keyof typeof STAT_ROW_STYLES;

@Component({
  selector: 'app-stat-row',
  standalone: true,
  imports: [NgClass],
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'flex items-center justify-between gap-lg py-sm',
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
