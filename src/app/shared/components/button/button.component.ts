import { Component, computed, inject, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FocusMonitor } from '@angular/cdk/a11y';

// All class values live here — Tailwind JIT detects them via static scan of this file
export const BUTTON_VARIANTS = {
  primary:   'bg-[#6366f1] hover:bg-[#4f46e5] text-white border border-[#6366f1] hover:border-[#4f46e5]',
  secondary: 'bg-surface hover:bg-border text-[#e0e0e0] border border-border hover:border-[#4a4d5a]',
  ghost:     'bg-transparent hover:bg-[rgba(255,255,255,0.06)] text-[#b0b3c0] hover:text-[#e0e0e0] border border-transparent',
} as const;

export const BUTTON_SIZES = {
  sm: 'text-[0.72rem] px-3 py-[5px]',
  md: 'text-[0.82rem] px-4 py-[7px]',
  lg: 'text-[0.9rem]  px-5 py-[9px]',
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
      class="inline-flex items-center justify-center gap-2 font-medium rounded-[6px]
             transition-colors duration-150 cursor-pointer
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]
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

  protected readonly focusMonitor  = inject(FocusMonitor);
  protected readonly variantClasses = computed(() => BUTTON_VARIANTS[this.variant()]);
  protected readonly sizeClasses    = computed(() => BUTTON_SIZES[this.size()]);

  protected handleClick(): void {
    if (!this.disabled()) this.clicked.emit();
  }
}
