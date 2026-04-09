import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlan, PRICING_PLANS } from '../../models/pricing.model';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  plans: PricingPlan[] = PRICING_PLANS;
}
