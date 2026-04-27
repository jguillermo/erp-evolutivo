import { Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

// All hex/rgba values live here — Tailwind JIT detects them via static scan of this file
export const ALERT_STYLES = {
  info: {
    container: 'bg-[rgba(6,182,212,0.1)] border-[rgba(6,182,212,0.3)] text-[#22d3ee]',
    icon: 'ℹ️',
  },
  success: {
    container: 'bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.3)] text-[#34d399]',
    icon: '✅',
  },
  warning: {
    container: 'bg-[rgba(245,158,11,0.1)] border-[rgba(245,158,11,0.3)] text-[#fbbf24]',
    icon: '⚠️',
  },
  error: {
    container: 'bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.3)] text-[#f87171]',
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
    <div class="flex items-start gap-2 px-3 py-2 rounded-[6px] border text-[0.82rem]"
         [ngClass]="styles().container">
      <span aria-hidden="true">{{ styles().icon }}</span>
      <span class="flex-1">{{ message() }}</span>
      @if (dismissible()) {
        <button class="ml-auto text-current opacity-70 hover:opacity-100 transition-opacity
                       text-[1rem] leading-none cursor-pointer"
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
