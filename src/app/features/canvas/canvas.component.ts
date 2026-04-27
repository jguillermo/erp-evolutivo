import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ListComponent } from '../../shared/components/list/list.component';
import { ListItemComponent } from '../../shared/components/list/list-item.component';
import { SectionComponent } from '../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../shared/components/quoted-text/quoted-text.component';
import { BadgeLabelComponent } from '../../shared/components/badge-label/badge-label.component';
import { ComparisonRowComponent } from '../../shared/components/comparison-row/comparison-row.component';
import { TierSectionComponent } from '../../shared/components/tier-section/tier-section.component';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [
    CardComponent,
    BadgeComponent,
    ListComponent,
    ListItemComponent,
    SectionComponent,
    QuotedTextComponent,
    BadgeLabelComponent,
    ComparisonRowComponent,
    TierSectionComponent,
  ],
  templateUrl: './canvas.component.html',
})
export class CanvasComponent {}
