import { Component, input } from '@angular/core';
import { BadgeLabelComponent } from '../badge-label/badge-label.component';
import { ListComponent } from '../list/list.component';
import { BadgeColor } from '../badge/badge.component';

@Component({
  selector: 'app-tier-section',
  standalone: true,
  imports: [BadgeLabelComponent, ListComponent],
  host: {
    '[attr.data-testid]': 'testId() ?? null',
    'class': 'block mt-2',
  },
  template: `
    <app-badge-label
      class="mb-[2px]"
      variant="description"
      [badgeColor]="badgeColor()"
      [badgeText]="badgeText()"
      [badgeTestId]="badgeTestId()"
      [labelText]="tierDescription()"
    />
    <app-list [testId]="listTestId()"><ng-content /></app-list>
  `,
})
export class TierSectionComponent {
  readonly testId          = input<string>();
  readonly badgeTestId     = input.required<string>();
  readonly badgeColor      = input.required<BadgeColor>();
  readonly badgeText       = input.required<string>();
  readonly tierDescription = input.required<string>();
  readonly listTestId      = input.required<string>();
}
