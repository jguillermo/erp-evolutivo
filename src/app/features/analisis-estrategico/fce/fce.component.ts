import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, CardColor } from '../../../shared/components/card/card.component';
import { ListComponent } from '../../../shared/components/list/list.component';
import { ListItemComponent } from '../../../shared/components/list/list-item.component';
import { SectionComponent, SectionVariant } from '../../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../../shared/components/quoted-text/quoted-text.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import fceData from '../../../../../data/data-1.4-fce.json';

type FceBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'info'; text: string }
  | { type: 'implication'; title: string; text: string };

interface FceFactor {
  id: string;
  number: string;
  layer: string;
  title: string;
  emoji: string;
  question: string;
  blocks: FceBlock[];
}

interface SynthesisLayer {
  id: string;
  badge: string;
  horizon: string;
  fces: string;
  title: string;
  text: string;
}

const FACTOR_COLORS: Record<string, CardColor> = {
  'fce-1':  'red',
  'fce-2':  'amber',
  'fce-3':  'teal',
  'fce-4':  'blue',
  'fce-5':  'cyan',
  'fce-6':  'purple',
  'fce-7':  'indigo',
  'fce-8':  'green',
  'fce-9':  'red',
  'fce-10': 'emerald',
};

const BLOCK_VARIANTS: Record<'note' | 'info' | 'implication', SectionVariant> = {
  note:        'note',
  info:        'info',
  implication: 'callout',
};

@Component({
  selector: 'app-fce',
  standalone: true,
  imports: [RouterLink, CardComponent, ListComponent, ListItemComponent, SectionComponent, QuotedTextComponent, MarkdownPipe],
  templateUrl: './fce.component.html',
})
export class FceComponent {
  protected readonly data = fceData;
  protected readonly factors = fceData.factors as FceFactor[];
  protected readonly layers = fceData.synthesis.layers as SynthesisLayer[];

  protected factorColor(id: string): CardColor {
    return FACTOR_COLORS[id] ?? 'indigo';
  }

  protected sectionVariant(blockType: 'note' | 'info' | 'implication'): SectionVariant {
    return BLOCK_VARIANTS[blockType];
  }
}
