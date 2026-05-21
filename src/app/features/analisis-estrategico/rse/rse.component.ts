import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, CardColor } from '../../../shared/components/card/card.component';
import { ListComponent } from '../../../shared/components/list/list.component';
import { ListItemComponent } from '../../../shared/components/list/list-item.component';
import { SectionComponent, SectionVariant } from '../../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../../shared/components/quoted-text/quoted-text.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import data from '../../../../../data/data-1.5.2-rse.json';

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
  'frente-1':   'green',
  'frente-2':   'blue',
  'frente-3':   'cyan',
  'frente-4':   'teal',
  exclusiones:  'amber',
};

const BLOCK_VARIANTS: Record<'note' | 'info' | 'implication', SectionVariant> = {
  note:        'note',
  info:        'info',
  implication: 'callout',
};

@Component({
  selector: 'app-rse',
  standalone: true,
  imports: [RouterLink, CardComponent, ListComponent, ListItemComponent, SectionComponent, QuotedTextComponent, MarkdownPipe],
  templateUrl: './rse.component.html',
})
export class RseComponent {
  protected readonly data = data;
  protected readonly sections = data.sections as Section[];

  protected sectionColor(id: string): CardColor {
    return SECTION_COLORS[id] ?? 'indigo';
  }

  protected sectionVariant(blockType: 'note' | 'info' | 'implication'): SectionVariant {
    return BLOCK_VARIANTS[blockType];
  }
}
