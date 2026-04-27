import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { BadgeComponent, BadgeColor } from '../badge/badge.component';

// All hex values here for Tailwind JIT detection
export const BADGE_LABEL_VARIANTS = {
  title:       'text-[0.65rem] font-bold text-[#fef3c7] print:text-[7px]',
  description: 'text-[0.62rem] text-[#9ca3af] leading-[1.3] print:text-[6.5px]',
} as const;

export type BadgeLabelVariant = keyof typeof BADGE_LABEL_VARIANTS;

@Component({
  selector: 'app-badge-label',
  standalone: true,
  imports: [BadgeComponent, NgClass],
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'flex items-center gap-[6px]',
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
