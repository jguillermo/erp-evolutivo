import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All class values live here — Tailwind JIT detects them via static scan of this file
export const TOOLTIP_POSITIONS = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-sm',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-sm',
  left:   'right-full top-1/2 -translate-y-1/2 mr-sm',
  right:  'left-full top-1/2 -translate-y-1/2 ml-sm',
} as const;

export type TooltipPosition = keyof typeof TOOLTIP_POSITIONS;

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [NgClass],
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'relative inline-block group',
  },
  template: `
    <ng-content />
    <div role="tooltip"
         class="absolute z-50 px-lg py-sm text-xs font-medium text-ink
                bg-surface border border-line rounded-[4px] whitespace-nowrap
                shadow-lg pointer-events-none
                opacity-0 transition-opacity duration-150
                group-hover:opacity-100 group-focus-within:opacity-100
                print:hidden"
         [ngClass]="positionClasses()"
         [attr.id]="testId() ? testId() + '-tooltip' : null">
      {{ text() }}
    </div>
  `,
})
export class TooltipComponent {
  readonly testId   = input<string>();
  readonly text     = input.required<string>();
  readonly position = input<TooltipPosition>('top');

  readonly positionClasses = computed(() => TOOLTIP_POSITIONS[this.position()]);
}
