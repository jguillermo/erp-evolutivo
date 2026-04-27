import { Component, input } from '@angular/core';

@Component({
  selector: 'app-quoted-text',
  standalone: true,
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'block',
  },
  template: `
    <p class="text-[0.78rem] text-slate-200 leading-[1.5] border-l-2 border-accent-400 pl-2 italic
              print:text-[8px] print:leading-[1.35]">
      <ng-content />
    </p>
  `,
})
export class QuotedTextComponent {
  readonly testId = input<string>();
}