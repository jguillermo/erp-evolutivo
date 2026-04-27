import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'block mb-6',
  },
  template: `
    <div class="flex items-center gap-3 mb-2">
      <span class="text-2xl" data-testid="page-header-emoji">{{ emoji() }}</span>
      <h1 class="text-xl font-bold text-ink tracking-tight" data-testid="page-header-title">
        {{ title() }}
      </h1>
    </div>
    @if (subtitle()) {
      <p class="text-[0.85rem] text-ink-muted leading-[1.6]" data-testid="page-header-subtitle">
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
