import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'flex flex-col items-center justify-center min-h-[300px] text-center',
  },
  template: `
    <span class="text-5xl mb-2xl">{{ emoji() }}</span>
    <h2 class="text-lg font-bold text-ink mb-lg" data-testid="empty-state-title">
      {{ title() }}
    </h2>
    @if (description()) {
      <p class="text-md text-ink-muted max-w-[400px] leading-[1.6]"
         data-testid="empty-state-description">
        {{ description() }}
      </p>
    }
  `,
})
export class EmptyStateComponent {
  readonly testId      = input<string>();
  readonly emoji       = input<string>('🚧');
  readonly title       = input.required<string>();
  readonly description = input<string>('');
}
