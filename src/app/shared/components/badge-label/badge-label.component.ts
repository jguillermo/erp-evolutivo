import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { BadgeComponent, BadgeColor } from '../badge/badge.component';

// All color tokens live here — usan tokens semánticos que cambian automáticamente
// entre modo oscuro y modo claro vía CSS variables.
export const BADGE_LABEL_VARIANTS = {
  title:       'text-2xs font-bold text-warning-fg-strong print:text-print-xs',
  description: 'text-2xs text-ink-muted leading-compact print:text-print-xs',
} as const;

export type BadgeLabelVariant = keyof typeof BADGE_LABEL_VARIANTS;

@Component({
  selector: 'app-badge-label',
  standalone: true,
  imports: [BadgeComponent, NgClass],
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'flex items-center gap-md',
  },
  template: `
    <app-badge [color]="badgeColor()" [testId]="badgeTestId()">{{ badgeText() }}</app-badge>
    <span [ngClass]="labelStyles()">{{ labelText() }}</span>
  `,
})
export class BadgeLabelComponent {
  readonly testId      = input<string>();
  readonly badgeTestId = input.required<string>();
  readonly badgeColor  = input.required<BadgeColor>();
  readonly badgeText   = input.required<string>();
  readonly labelText   = input.required<string>();
  readonly variant     = input<BadgeLabelVariant>('description');

  readonly labelStyles = computed(() => BADGE_LABEL_VARIANTS[this.variant()]);
}
