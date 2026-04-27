import { Component, input } from '@angular/core';

@Component({
  selector: 'app-comparison-row',
  standalone: true,
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'block',
  },
  template: `
    <p class="text-2xs text-slate-400 font-bold mt-sm mb-nano">vs. {{ competitor() }}:</p>
    <p class="text-xs text-slate-200 pl-lg mb-xs print:text-print-xs"><ng-content /></p>
  `,
})
export class ComparisonRowComponent {
  readonly competitor = input.required<string>();
  readonly testId     = input<string>();
}
