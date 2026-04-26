import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './canvas.component.html',
})
export class CanvasComponent {}
