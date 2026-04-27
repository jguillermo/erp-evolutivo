import { Component, input } from '@angular/core';

@Component({
  selector: 'app-comparison-row',
  standalone: true,
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'block',
  },
  template: `
    <p class="text-[0.65rem] text-slate-400 font-bold mt-1 mb-[1px]">vs. {{ competitor() }}:</p>
    <p class="text-[0.72rem] text-slate-200 pl-2 mb-[2px] print:text-[7.5px]"><ng-content /></p>
  `,
})
export class ComparisonRowComponent {
  readonly competitor = input.required<string>();
  readonly testId     = input<string>();
}
