import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, CardColor } from '../../../shared/components/card/card.component';
import { ListComponent } from '../../../shared/components/list/list.component';
import { ListItemComponent } from '../../../shared/components/list/list-item.component';
import { SectionComponent, SectionVariant } from '../../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../../shared/components/quoted-text/quoted-text.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import data from '../../../../../data/data-2.1.1-mercado-objetivo-caracteristicas.json';

type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'info'; text: string }
  | { type: 'implication'; title: string; text: string };

interface Dimension {
  id: string;
  title: string;
  emoji: string;
  question: string;
  blocks: Block[];
}

const DIMENSION_COLORS: Record<string, CardColor> = {
  demografica:  'cyan',
  geografica:   'blue',
  psicografica: 'purple',
};

const BLOCK_VARIANTS: Record<'note' | 'info' | 'implication', SectionVariant> = {
  note:        'note',
  info:        'info',
  implication: 'callout',
};

@Component({
  selector: 'app-mercado-objetivo-caracteristicas',
  standalone: true,
  imports: [RouterLink, CardComponent, ListComponent, ListItemComponent, SectionComponent, QuotedTextComponent, MarkdownPipe],
  templateUrl: './mercado-objetivo-caracteristicas.component.html',
})
export class MercadoObjetivoCaracteristicasComponent {
  protected readonly data = data;
  protected readonly dimensions = data.dimensions as Dimension[];

  protected dimensionColor(id: string): CardColor {
    return DIMENSION_COLORS[id] ?? 'indigo';
  }

  protected sectionVariant(blockType: 'note' | 'info' | 'implication'): SectionVariant {
    return BLOCK_VARIANTS[blockType];
  }
}
