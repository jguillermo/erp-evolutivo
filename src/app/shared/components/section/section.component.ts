import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All color tokens live here — Tailwind JIT detects them via static scan of this file
export const SECTION_STYLES = {
  note: {
    container: 'mt-lg px-lg py-md bg-white/[3%] rounded border-l-2 border-gray-600 text-xs text-slate-400 print:mt-sm print:px-md print:py-sm',
    title: 'text-2xs font-bold text-slate-400 mb-sm print:text-print-xs',
  },
  info: {
    container: 'mt-lg px-lg py-md bg-accent-500/[6%] rounded-md print:mt-sm print:px-md print:py-sm',
    title: 'text-2xs font-bold text-accent-300 mb-sm print:text-print-xs',
  },
  callout: {
    container: 'mt-lg px-lg py-md bg-ai-500/[8%] border border-ai-500/20 rounded-md print:mt-sm print:px-md print:py-sm',
    title: 'text-2xs font-bold text-ai-400 mb-sm print:text-print-xs',
  },
  highlight: {
    container: 'mt-md px-lg py-lg bg-warning-600/[7%] border border-warning-600/40 rounded-md print:mt-sm print:px-md print:py-sm',
    title: 'text-2xs font-bold text-warning-100 mb-sm print:text-print-xs',
  },
  feature: {
    container: 'mt-lg px-lg py-md bg-accent-500/[8%] border border-accent-500/35 rounded-md print:mt-sm print:px-md print:py-sm',
    title: 'text-2xs font-bold text-accent-300 mb-sm print:text-print-xs',
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
