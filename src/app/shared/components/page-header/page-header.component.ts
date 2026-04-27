import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'block mb-4xl',
  },
  template: `
    <div class="flex items-center gap-xl mb-lg">
      <span class="text-2xl" data-testid="page-header-emoji">{{ emoji() }}</span>
      <h1 class="text-xl font-bold text-ink tracking-tight" data-testid="page-header-title">
        {{ title() }}
      </h1>
    </div>
    @if (subtitle()) {
      <p class="text-md text-ink-muted leading-comfortable" data-testid="page-header-subtitle">
        {{ subtitle() }}
      </p>
    }
  `,
})
export class PageHeaderComponent {
  readonly testId   = input<string>();
  readonly emoji    = input.required<string>();
  readonly title    = input.required<string>();
  readonly subtitle = input<string>('');
}
