import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, CardColor } from '../../../shared/components/card/card.component';
import { BadgeComponent, BadgeColor } from '../../../shared/components/badge/badge.component';
import { SectionComponent, SectionVariant } from '../../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../../shared/components/quoted-text/quoted-text.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import data from '../../../../../data/data-1.3-efi-efe.json';

type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'note'; text: string }
  | { type: 'info'; text: string }
  | { type: 'list'; label?: string; items: string[] }
  | { type: 'implication'; title: string; text: string };

interface Factor {
  tag: string;
  title: string;
  weight: number;
  rating: number;
  weighted: number;
  justification: string;
}

interface FactorGroup {
  id: string;
  kind: 'strength' | 'weakness' | 'opportunity' | 'threat';
  title: string;
  factors: Factor[];
  subtotal_weight: number;
  subtotal_weighted: number;
}

interface Matrix {
  id: string;
  title: string;
  emoji: string;
  question: string;
  scale: string;
  groups: FactorGroup[];
  total_weighted: number;
  interpretation: { blocks: Block[] };
}

interface ConclusionSection {
  title: string;
  emoji: string;
  question: string;
  blocks: Block[];
}

const MATRIX_COLORS: Record<string, CardColor> = {
  efi: 'indigo',
  efe: 'teal',
};

const BLOCK_VARIANTS: Record<'note' | 'info' | 'implication', SectionVariant> = {
  note: 'note',
  info: 'info',
  implication: 'callout',
};

@Component({
  selector: 'app-efi-efe',
  standalone: true,
  imports: [RouterLink, CardComponent, BadgeComponent, SectionComponent, QuotedTextComponent, MarkdownPipe],
  templateUrl: './efi-efe.component.html',
})
export class EfiEfeComponent {
  protected readonly data = data;
  protected readonly matrices = data.matrices as unknown as Matrix[];
  protected readonly conclusions = data.conclusions as unknown as ConclusionSection;

  protected matrixColor(id: string): CardColor {
    return MATRIX_COLORS[id] ?? 'indigo';
  }

  protected factorBadgeColor(kind: string, rating: number): BadgeColor {
    if (kind === 'strength') return rating >= 4 ? 'green-hi' : 'green-lo';
    if (kind === 'weakness') return rating <= 1 ? 'red' : 'orange';
    if (kind === 'opportunity') return rating >= 4 ? 'teal-hi' : rating >= 3 ? 'teal-mid' : 'teal-lo';
    return rating <= 1 ? 'red' : rating <= 2 ? 'amber' : 'teal-lo';
  }

  protected sectionVariant(blockType: 'note' | 'info' | 'implication'): SectionVariant {
    return BLOCK_VARIANTS[blockType];
  }

  protected fmt(n: number): string {
    return n.toFixed(2);
  }
}
