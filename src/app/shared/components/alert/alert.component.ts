import { Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

// All color tokens live here — Tailwind JIT detects them via static scan of this file
export const ALERT_STYLES = {
  info: {
    container: 'bg-accent-500/10 border-accent-500/30 text-accent-400',
    icon: 'ℹ️',
  },
  success: {
    container: 'bg-success-500/10 border-success-500/30 text-success-400',
    icon: '✅',
  },
  warning: {
    container: 'bg-warning-500/10 border-warning-500/30 text-warning-400',
    icon: '⚠️',
  },
  error: {
    container: 'bg-danger-500/10 border-danger-500/30 text-danger-400',
    icon: '❌',
  },
} as const;

export type AlertVariant = keyof typeof ALERT_STYLES;

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'block',
    '[attr.role]':      'variant() === "error" ? "alert" : "status"',
    '[attr.aria-live]': 'variant() === "error" ? "assertive" : "polite"',
  },
  template: `
    <div class="flex items-start gap-2 px-3 py-2 rounded-[6px] border text-sm"
         [ngClass]="styles().container">
      <span aria-hidden="true">{{ styles().icon }}</span>
      <span class="flex-1">{{ message() }}</span>
      @if (dismissible()) {
        <button class="ml-auto text-current opacity-70 hover:opacity-100 transition-opacity
                       text-base leading-none cursor-pointer"
                [attr.aria-label]="'Dismiss ' + variant() + ' alert'"
                (click)="onDismiss()">
          ×
        </button>
      }
    </div>
  `,
})
export class AlertComponent {
  readonly testId      = input<string>();
  readonly variant     = input.required<AlertVariant>();
  readonly message     = input.required<string>();
  readonly dismissible = input<boolean>(false);
  readonly dismissed   = output<void>();

  protected readonly styles = computed(() => ALERT_STYLES[this.variant()]);

  protected onDismiss(): void {
    this.dismissed.emit();
  }
}
