import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All color tokens live here — usan tokens semánticos que cambian automáticamente
// entre modo oscuro y modo claro vía CSS variables.
export const SECTION_STYLES = {
  note: {
    container: 'mt-lg px-lg py-md bg-surface-raised rounded border-l-2 border-line-strong text-xs text-ink-muted print:mt-sm print:px-md print:py-sm',
    title: 'text-2xs font-bold text-ink-muted mb-sm print:text-print-xs',
  },
  info: {
    container: 'mt-lg px-lg py-md bg-accent-tint-soft rounded-md print:mt-sm print:px-md print:py-sm',
    title: 'text-2xs font-bold text-accent-fg mb-sm print:text-print-xs',
  },
  callout: {
    container: 'mt-lg px-lg py-md bg-ai-tint-soft border border-ai-line rounded-md print:mt-sm print:px-md print:py-sm',
    title: 'text-2xs font-bold text-ai-fg mb-sm print:text-print-xs',
  },
  highlight: {
    container: 'mt-md px-lg py-lg bg-warning-tint border border-warning-line rounded-md print:mt-sm print:px-md print:py-sm',
    title: 'text-2xs font-bold text-warning-fg-strong mb-sm print:text-print-xs',
  },
  feature: {
    container: 'mt-lg px-lg py-md bg-accent-tint border border-accent-line rounded-md print:mt-sm print:px-md print:py-sm',
    title: 'text-2xs font-bold text-accent-fg mb-sm print:text-print-xs',
  },
} as const;

export type SectionVariant = keyof typeof SECTION_STYLES;

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [NgClass],
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'block',
  },
  template: `
    <div [ngClass]="styles().container">
      @if (title()) {
        <p [ngClass]="styles().title"
           [attr.data-testid]="testId() ? testId() + '-title' : null">
          {{ title() }}
        </p>
      }
      <ng-content />
    </div>
  `,
})
export class SectionComponent {
  readonly testId  = input<string>();
  readonly variant = input.required<SectionVariant>();
  readonly title   = input<string>('');

  readonly styles = computed(() => SECTION_STYLES[this.variant()]);
}
