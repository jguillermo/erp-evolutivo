import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, CardColor } from '../../../shared/components/card/card.component';
import { ListComponent } from '../../../shared/components/list/list.component';
import { ListItemComponent } from '../../../shared/components/list/list-item.component';
import { SectionComponent, SectionVariant } from '../../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../../shared/components/quoted-text/quoted-text.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';
import data from '../../../../../data/analisis-interno.json';

type AuditBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; label?: string; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'info'; text: string }
  | { type: 'implication'; title: string; text: string };

interface Audit {
  id: string;
  title: string;
  emoji: string;
  question: string;
  blocks: AuditBlock[];
}

type SynthesisKind = 'fortalezas' | 'debilidades' | 'competencias';

interface SynthesisGroup {
  kind: SynthesisKind;
  label: string;
  title: string;
  items: string[];
}

const AUDIT_COLORS: Record<string, CardColor> = {
  'administracion':        'purple',
  'marketing':             'red',
  'operaciones':           'indigo',
  'finanzas':              'blue',
  'recursos-humanos':      'amber',
  'sistemas-informacion':  'cyan',
};

const BLOCK_VARIANTS: Record<'note' | 'info' | 'implication', SectionVariant> = {
  note:        'note',
  info:        'info',
  implication: 'callout',
};

const SYNTHESIS_VARIANT: Record<SynthesisKind, SectionVariant> = {
  fortalezas:    'feature',
  debilidades:   'highlight',
  competencias:  'callout',
};

@Component({
  selector: 'app-analisis-interno',
  standalone: true,
  imports: [
    RouterLink,
    CardComponent,
    ListComponent,
    ListItemComponent,
    SectionComponent,
    QuotedTextComponent,
    MarkdownPipe,
  ],
  templateUrl: './analisis-interno.component.html',
})
export class AnalisisInternoComponent {
  protected readonly data = data;
  protected readonly audits = data.audits as Audit[];
  protected readonly synthesisGroups = data.synthesis.groups as SynthesisGroup[];

  protected auditColor(id: string): CardColor {
    return AUDIT_COLORS[id] ?? 'indigo';
  }

  protected sectionVariant(blockType: 'note' | 'info' | 'implication'): SectionVariant {
    return BLOCK_VARIANTS[blockType];
  }

  protected synthesisVariant(kind: SynthesisKind): SectionVariant {
    return SYNTHESIS_VARIANT[kind];
  }
}
