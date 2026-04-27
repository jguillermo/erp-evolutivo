import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'block',
  },
  template: `<ul class="list-none"><ng-content /></ul>`,
})
export class ListComponent {
  readonly testId = input<string>();
}
