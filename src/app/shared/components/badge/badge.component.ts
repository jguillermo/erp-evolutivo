import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

// All color tokens live here — Tailwind JIT detects them via static scan of this file
export const BADGE_COLORS = {
  'indigo':       'text-[0.55rem] px-[4px] mr-[4px] bg-primary-500/20 text-primary-300 border border-primary-500/40',
  'slate':        'text-[0.55rem] px-[4px] mr-[4px] bg-slate-600/20 text-slate-400 border border-slate-600/35',
  'teal-hi':      'text-[0.55rem] px-[4px] mr-[4px] bg-teal-500/25 text-teal-400 border border-teal-500/50',
  'teal-mid':     'text-[0.55rem] px-[4px] mr-[4px] bg-teal-500/[12%] text-teal-300 border border-teal-500/25',
  'teal-lo':      'text-[0.55rem] px-[4px] mr-[4px] bg-teal-500/[6%] text-teal-200 border border-teal-500/15',
  'red':          'text-[0.58rem] px-[4px] mr-[4px] bg-danger-500/15 text-danger-400 border border-danger-500/30',
  'orange':       'text-[0.58rem] px-[4px] mr-[4px] bg-orange-400/15 text-orange-400 border border-orange-400/30',
  'green-hi':     'text-[0.58rem] px-[4px] mr-[4px] bg-green-400/15 text-green-400 border border-green-400/30',
  'green-lo':     'text-[0.58rem] px-[4px] mr-[4px] bg-green-400/[7%] text-green-300 border border-green-400/15',
  'pink':         'text-[0.58rem] px-[4px] mr-[4px] bg-pink-300/10 text-pink-300 border border-pink-300/20',
  'amber-solid':  'text-[0.58rem] px-[5px] bg-warning-600 text-white',
  'amber':        'text-[0.55rem] px-[5px] bg-warning-400/15 text-warning-400 border border-warning-400/30',
  'orange-dim':   'text-[0.55rem] px-[5px] bg-orange-500/15 text-orange-400 border border-orange-500/30',
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
