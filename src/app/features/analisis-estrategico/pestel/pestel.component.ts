import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, CardColor } from '../../../shared/components/card/card.component';
import { ListComponent } from '../../../shared/components/list/list.component';
import { ListItemComponent } from '../../../shared/components/list/list-item.component';
import { SectionComponent, SectionVariant } from '../../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../../shared/components/quoted-text/quoted-text.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import pestelData from '../../../../../data/data-1.1.1-pestel.json';

type PestelBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; label?: string; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'info'; text: string }
  | { type: 'implication'; title: string; text: string };

interface PestelFactor {
  id: string;
  title: string;
  emoji: string;
  question: string;
  blocks: PestelBlock[];
}

const FACTOR_COLORS: Record<string, CardColor> = {
  politico:    'amber',
  economico:   'blue',
  social:      'cyan',
  tecnologico: 'indigo',
  ecologico:   'green',
  legal:       'red',
};

const BLOCK_VARIANTS: Record<'note' | 'info' | 'implication', SectionVariant> = {
  note:        'note',
  info:        'info',
  implication: 'callout',
};

@Component({
  selector: 'app-pestel',
  standalone: true,
  imports: [RouterLink, CardComponent, ListComponent, ListItemComponent, SectionComponent, QuotedTextComponent, MarkdownPipe],
  templateUrl: './pestel.component.html',
})
export class PestelComponent {
  protected readonly data = pestelData;
  protected readonly factors = pestelData.factors as PestelFactor[];

  protected factorColor(id: string): CardColor {
    return FACTOR_COLORS[id] ?? 'indigo';
  }

  protected sectionVariant(blockType: 'note' | 'info' | 'implication'): SectionVariant {
    return BLOCK_VARIANTS[blockType];
  }
}
