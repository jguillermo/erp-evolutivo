import { Component, input } from '@angular/core';

@Component({
  selector: 'app-quoted-text',
  standalone: true,
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'block',
  },
  template: `
    <p class="text-sm text-slate-200 leading-normal border-l-2 border-accent-400 pl-lg italic
              print:text-print-sm print:leading-condensed">
      <ng-content />
    </p>
  `,
})
export class QuotedTextComponent {
  readonly testId = input<string>();
}