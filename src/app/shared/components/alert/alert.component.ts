import { Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

// All color tokens live here — usan tokens semánticos que cambian automáticamente
// entre modo oscuro y modo claro vía CSS variables.
export const ALERT_STYLES = {
  info: {
    container: 'bg-accent-tint-soft border-accent-line text-accent-fg',
    icon: 'ℹ️',
  },
  success: {
    container: 'bg-success-tint-soft border-success-line text-success-fg',
    icon: '✅',
  },
  warning: {
    container: 'bg-warning-tint-soft border-warning-line text-warning-fg',
    icon: '⚠️',
  },
  error: {
    container: 'bg-danger-tint-soft border-danger-line text-danger-fg',
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
    <div class="flex items-start gap-lg px-xl py-lg rounded-md border text-sm"
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
