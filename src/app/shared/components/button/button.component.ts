import { Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

// All color tokens live here — Tailwind JIT detects them via static scan of this file
export const BUTTON_VARIANTS = {
  primary:   'bg-primary-500 hover:bg-primary-600 text-white border border-primary-500 hover:border-primary-600',
  secondary: 'bg-surface hover:bg-surface-raised text-ink border border-line hover:border-line-strong',
  ghost:     'bg-transparent hover:bg-white/[6%] text-ink-muted hover:text-ink border border-transparent',
} as const;

export const BUTTON_SIZES = {
  sm: 'text-xs px-xl py-md',
  md: 'text-sm px-2xl py-lg',
  lg: 'text-md px-3xl py-lg',
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize    = keyof typeof BUTTON_SIZES;

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'inline-block',
  },
  template: `
    <button
      class="inline-flex items-center justify-center gap-lg font-medium rounded-md
             transition-colors duration-150 cursor-pointer
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
             disabled:opacity-50 disabled:cursor-not-allowed
             print:hidden"
      [ngClass]="[variantClasses(), sizeClasses()]"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel() ?? null"
      (click)="handleClick()">
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  readonly testId    = input<string>();
  readonly variant   = input<ButtonVariant>('primary');
  readonly size      = input<ButtonSize>('md');
  readonly disabled  = input<boolean>(false);
  readonly ariaLabel = input<string>();
  readonly clicked   = output<void>();

  protected readonly variantClasses = computed(() => BUTTON_VARIANTS[this.variant()]);
  protected readonly sizeClasses    = computed(() => BUTTON_SIZES[this.size()]);

  protected handleClick(): void {
    if (!this.disabled()) this.clicked.emit();
  }
}
