import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, CardColor } from '../../../shared/components/card/card.component';
import { BadgeComponent, BadgeColor } from '../../../shared/components/badge/badge.component';
import { ListComponent } from '../../../shared/components/list/list.component';
import { ListItemComponent } from '../../../shared/components/list/list-item.component';
import { SectionComponent, SectionVariant } from '../../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../../shared/components/quoted-text/quoted-text.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import porterData from '../../../../../data/data-1.1.2-porter.json';

type PorterBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; label?: string; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'info'; text: string }
  | { type: 'implication'; title: string; text: string };

interface PorterForce {
  id: string;
  title: string;
  emoji: string;
  question: string;
  intensity: string;
  blocks: PorterBlock[];
}

interface PorterSynthesis {
  title: string;
  blocks: PorterBlock[];
}

const FORCE_COLORS: Record<string, CardColor> = {
  rivalidad:        'red',
  'nuevos-entrantes': 'amber',
  proveedores:      'blue',
  clientes:         'cyan',
  sustitutos:       'purple',
};

const INTENSITY_BADGE: Record<string, BadgeColor> = {
  'BAJA':         'green-lo',
  'BAJO':         'green-lo',
  'BAJO-MEDIO':   'green-hi',
  'MEDIA':        'amber',
  'MEDIO':        'amber',
  'MEDIA-ALTA':   'orange-dim',
  'ALTA':         'orange',
  'ALTO':         'orange',
  'MUY ALTA':     'red',
};

const BLOCK_VARIANTS: Record<'note' | 'info' | 'implication', SectionVariant> = {
  note:        'note',
  info:        'info',
  implication: 'callout',
};

@Component({
  selector: 'app-porter',
  standalone: true,
  imports: [
    RouterLink,
    CardComponent,
    BadgeComponent,
    ListComponent,
    ListItemComponent,
    SectionComponent,
    QuotedTextComponent,
    MarkdownPipe,
  ],
  templateUrl: './porter.component.html',
})
export class PorterComponent {
  protected readonly data = porterData;
  protected readonly forces = porterData.forces as PorterForce[];
  protected readonly synthesis = porterData.synthesis as PorterSynthesis;

  protected forceColor(id: string): CardColor {
    return FORCE_COLORS[id] ?? 'indigo';
  }

  protected intensityBadge(intensity: string): BadgeColor {
    return INTENSITY_BADGE[intensity] ?? 'slate';
  }

  protected sectionVariant(blockType: 'note' | 'info' | 'implication'): SectionVariant {
    return BLOCK_VARIANTS[blockType];
  }
}
