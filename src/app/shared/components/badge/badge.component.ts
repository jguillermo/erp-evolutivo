import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All hex/rgba values live here — Tailwind JIT detects them via static scan of this file
export const BADGE_COLORS = {
  'indigo':       'text-[0.55rem] px-[4px] mr-[4px] bg-[rgba(99,102,241,0.2)] text-[#a5b4fc] border border-[rgba(99,102,241,0.4)]',
  'slate':        'text-[0.55rem] px-[4px] mr-[4px] bg-[rgba(71,85,105,0.2)] text-[#94a3b8] border border-[rgba(71,85,105,0.35)]',
  'teal-hi':      'text-[0.55rem] px-[4px] mr-[4px] bg-[rgba(20,184,166,0.25)] text-[#2dd4bf] border border-[rgba(20,184,166,0.5)]',
  'teal-mid':     'text-[0.55rem] px-[4px] mr-[4px] bg-[rgba(20,184,166,0.12)] text-[#5eead4] border border-[rgba(20,184,166,0.25)]',
  'teal-lo':      'text-[0.55rem] px-[4px] mr-[4px] bg-[rgba(20,184,166,0.06)] text-[#99f6e4] border border-[rgba(20,184,166,0.15)]',
  'red':          'text-[0.58rem] px-[4px] mr-[4px] bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.3)]',
  'orange':       'text-[0.58rem] px-[4px] mr-[4px] bg-[rgba(251,146,60,0.15)] text-[#fb923c] border border-[rgba(251,146,60,0.3)]',
  'green-hi':     'text-[0.58rem] px-[4px] mr-[4px] bg-[rgba(74,222,128,0.15)] text-[#4ade80] border border-[rgba(74,222,128,0.3)]',
  'green-lo':     'text-[0.58rem] px-[4px] mr-[4px] bg-[rgba(74,222,128,0.07)] text-[#86efac] border border-[rgba(74,222,128,0.15)]',
  'pink':         'text-[0.58rem] px-[4px] mr-[4px] bg-[rgba(249,168,212,0.1)] text-[#f9a8d4] border border-[rgba(249,168,212,0.2)]',
  'amber-solid':  'text-[0.58rem] px-[5px] bg-[#d97706] text-white',
  'amber':        'text-[0.55rem] px-[5px] bg-[rgba(251,191,36,0.15)] text-[#fbbf24] border border-[rgba(251,191,36,0.3)]',
  'orange-dim':   'text-[0.55rem] px-[5px] bg-[rgba(249,115,22,0.15)] text-[#fb923c] border border-[rgba(249,115,22,0.3)]',
} as const;

export type BadgeColor = keyof typeof BADGE_COLORS;

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  host: {
    '[attr.data-testid]': 'testId()',
    'class': 'inline',
  },
  template: `
    <span class="inline-block font-bold tracking-[0.5px] rounded-[3px] py-[1px] whitespace-nowrap print:text-[6px]"
          [ngClass]="styles()">
      <ng-content />
    </span>
  `,
})
export class BadgeComponent {
  readonly testId = input.required<string>();
  readonly color  = input.required<BadgeColor>();
  readonly styles = computed(() => BADGE_COLORS[this.color()]);
}
