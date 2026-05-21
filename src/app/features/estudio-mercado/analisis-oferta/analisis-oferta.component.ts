import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, CardColor } from '../../../shared/components/card/card.component';
import { ListComponent } from '../../../shared/components/list/list.component';
import { ListItemComponent } from '../../../shared/components/list/list-item.component';
import { SectionComponent, SectionVariant } from '../../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../../shared/components/quoted-text/quoted-text.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import data from '../../../../../data/data-2.4-analisis-oferta.json';

type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'info'; text: string }
  | { type: 'implication'; title: string; text: string };

interface Section {
  id: string;
  title: string;
  emoji: string;
  question: string;
  blocks: Block[];
}

const SECTION_COLORS: Record<string, CardColor> = {
  'capa-excel':            'red',
  'capa-ose':              'blue',
  'capa-software-pyme':    'purple',
  'capa-erp-robusto':      'indigo',
  'capa-pagos':            'amber',
  'factores-expansivos':   'green',
  'factores-restrictivos': 'teal',
  'metodologia':           'cyan',
  'proyeccion':            'emerald',
};

const BLOCK_VARIANTS: Record<'note' | 'info' | 'implication', SectionVariant> = {
  note:        'note',
  info:        'info',
  implication: 'callout',
};

@Component({
  selector: 'app-analisis-oferta',
  standalone: true,
  imports: [RouterLink, CardComponent, ListComponent, ListItemComponent, SectionComponent, QuotedTextComponent, MarkdownPipe],
  templateUrl: './analisis-oferta.component.html',
})
export class AnalisisOfertaComponent {
  protected readonly data = data;
  protected readonly sections = data.sections as Section[];

  protected sectionColor(id: string): CardColor {
    return SECTION_COLORS[id] ?? 'indigo';
  }

  protected sectionVariant(blockType: 'note' | 'info' | 'implication'): SectionVariant {
    return BLOCK_VARIANTS[blockType];
  }
}
