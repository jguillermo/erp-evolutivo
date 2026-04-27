import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ListComponent } from '../../shared/components/list/list.component';
import { ListItemComponent } from '../../shared/components/list/list-item.component';
import { SectionComponent } from '../../shared/components/section/section.component';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CardComponent, BadgeComponent, ListComponent, ListItemComponent, SectionComponent],
  templateUrl: './canvas.component.html',
})
export class CanvasComponent {}
