import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trigger, ActivationMode, TRIGGERS, ACTIVATION_MODES, TriggerMode } from '../../models/trigger.model';

@Component({
  selector: 'app-triggers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './triggers.component.html',
})
export class TriggersComponent {
  triggers: Trigger[] = TRIGGERS;
  activationModes: ActivationMode[] = ACTIVATION_MODES;

  getModeLabel(mode: TriggerMode): string {
    const labels: Record<TriggerMode, string> = {
      auto: 'Automático',
      suggest: 'Sugerido',
      manual: 'Manual',
      ai: '🧠 IA Proactiva',
    };
    return labels[mode];
  }

  getModeBadgeClass(mode: TriggerMode): string {
    const classes: Record<TriggerMode, string> = {
      auto: 'm-auto',
      suggest: 'm-suggest',
      manual: 'm-manual',
      ai: 'm-ai',
    };
    return classes[mode];
  }
}
