import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All hex/rgba values live here — Tailwind JIT detects them via static scan of this file
export const SECTION_STYLES = {
  note: {
    container: 'mt-2 px-[8px] py-[5px] bg-[rgba(255,255,255,0.03)] rounded-[4px] border-l-2 border-[#4b5563] text-[0.68rem] text-[#94a3b8] print:mt-1 print:px-[6px] print:py-[3px]',
    title: 'text-[0.65rem] font-bold text-[#94a3b8] mb-1 print:text-[7px]',
  },
  info: {
    container: 'mt-2 px-[8px] py-[6px] bg-[rgba(6,182,212,0.06)] rounded-[6px] print:mt-1 print:px-[6px] print:py-[4px]',
    title: 'text-[0.65rem] font-bold text-[#67e8f9] mb-[3px] print:text-[7px]',
  },
  callout: {
    container: 'mt-2 px-[8px] py-[6px] bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.2)] rounded-[6px] print:mt-1 print:px-[6px] print:py-[4px]',
    title: 'text-[0.65rem] font-bold text-[#a78bfa] mb-[3px] print:text-[7px]',
  },
  highlight: {
    container: 'mt-[6px] px-[9px] py-[7px] bg-[rgba(217,119,6,0.07)] border border-[rgba(217,119,6,0.4)] rounded-[6px] print:mt-1 print:px-[6px] print:py-[4px]',
    title: 'text-[0.65rem] font-bold text-[#fef3c7] mb-1 print:text-[7px]',
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
