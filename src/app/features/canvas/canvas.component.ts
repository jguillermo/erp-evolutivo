import { Component } from '@angular/core';
import { CardComponent, CardColor } from '../../shared/components/card/card.component';
import { BadgeComponent, BadgeColor } from '../../shared/components/badge/badge.component';
import { ListComponent } from '../../shared/components/list/list.component';
import { ListItemComponent } from '../../shared/components/list/list-item.component';
import { SectionComponent } from '../../shared/components/section/section.component';
import { QuotedTextComponent } from '../../shared/components/quoted-text/quoted-text.component';
import { BadgeLabelComponent } from '../../shared/components/badge-label/badge-label.component';
import { ComparisonRowComponent } from '../../shared/components/comparison-row/comparison-row.component';
import { TierSectionComponent } from '../../shared/components/tier-section/tier-section.component';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import canvasData from '../../../../data/data-0-canvas.json';

interface CanvasItem {
  tag?: string;
  label?: string;
  text: string;
}

interface CanvasCardBase {
  id: string;
  title: string;
  emoji: string;
  question: string;
}

interface ItemListCard extends CanvasCardBase {
  items: CanvasItem[];
}

interface ItemListWithNoteCard extends ItemListCard {
  note: string;
}

interface ValuePropCard extends ItemListCard {
  valueStatement: string;
  comparisons: { competitor: string; text: string }[];
  gameMechanic: { title: string; text: string };
  entryModule: { title: string; primary: string; secondary: string };
}

interface SegmentsCard extends CanvasCardBase {
  meta: string;
  beachhead: { badge: string; label: string; description: string; items: string[] };
  tiers: { badge: string; description: string; items: string[] }[];
}

interface CardStyle {
  color: CardColor;
  gridClass: string;
}

const CARD_STYLES: Record<string, CardStyle> = {
  'socios-clave': {
    color: 'purple',
    gridClass: '[grid-column:1/3] [grid-row:1/3] max-md:[grid-column:auto] max-md:[grid-row:auto] print:[grid-column:1/3] print:[grid-row:1/3]',
  },
  'actividades-clave': {
    color: 'indigo',
    gridClass: '[grid-column:3/5] [grid-row:1] max-md:[grid-column:auto] max-md:[grid-row:auto] print:[grid-column:3/5] print:[grid-row:1/2]',
  },
  'recursos-clave': {
    color: 'blue',
    gridClass: '[grid-column:3/5] [grid-row:2] max-md:[grid-column:auto] max-md:[grid-row:auto] print:[grid-column:3/5] print:[grid-row:2/3]',
  },
  'propuesta-valor': {
    color: 'cyan',
    gridClass: '[grid-column:5/7] [grid-row:1/3] max-md:[grid-column:auto] max-md:[grid-row:auto] print:[grid-column:5/7] print:[grid-row:1/3]',
  },
  'relacion-clientes': {
    color: 'green',
    gridClass: '[grid-column:7/9] [grid-row:1] max-md:[grid-column:auto] max-md:[grid-row:auto] print:[grid-column:7/9] print:[grid-row:1/2]',
  },
  'canales': {
    color: 'teal',
    gridClass: '[grid-column:7/9] [grid-row:2] max-md:[grid-column:auto] max-md:[grid-row:auto] print:[grid-column:7/9] print:[grid-row:2/3]',
  },
  'segmentos': {
    color: 'amber',
    gridClass: '[grid-column:9/11] [grid-row:1/3] max-md:[grid-column:auto] max-md:[grid-row:auto] print:[grid-column:9/11] print:[grid-row:1/3]',
  },
  'estructura-costos': {
    color: 'red',
    gridClass: '[grid-column:1/6] [grid-row:3] max-md:[grid-column:auto] max-md:[grid-row:auto] print:[grid-column:1/6] print:[grid-row:3/4]',
  },
  'fuentes-ingreso': {
    color: 'emerald',
    gridClass: '[grid-column:6/11] [grid-row:3] max-md:[grid-column:auto] max-md:[grid-row:auto] print:[grid-column:6/11] print:[grid-row:3/4]',
  },
};

const TAG_COLORS: Record<string, Record<string, BadgeColor>> = {
  'socios-clave':      { 'FASE 1': 'indigo', 'FASE 2+': 'slate' },
  'actividades-clave': { 'FASE 1': 'indigo', 'FASE 2+': 'slate' },
  'recursos-clave':    { 'FASE 1': 'indigo', 'FASE 2+': 'slate' },
  'canales':           { 'CANAL #1': 'teal-hi', 'CANAL #2': 'teal-mid', 'CANAL #3': 'teal-lo' },
  'estructura-costos': { 'FIJO': 'red', 'VARIABLE': 'orange' },
  'fuentes-ingreso':   { 'PRINCIPAL': 'green-hi', 'SECUNDARIO': 'green-lo', 'FUTURO': 'pink' },
};

const TIER_BADGE_COLORS: Record<string, BadgeColor> = {
  'BEACHHEAD': 'amber-solid',
  'FASE 2': 'amber',
  'FASE 3': 'orange-dim',
};

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [
    CardComponent,
    BadgeComponent,
    ListComponent,
    ListItemComponent,
    SectionComponent,
    QuotedTextComponent,
    BadgeLabelComponent,
    ComparisonRowComponent,
    TierSectionComponent,
    MarkdownPipe,
  ],
  templateUrl: './canvas.component.html',
})
export class CanvasComponent {
  protected readonly sociosClave      = this.findCard<ItemListCard>('socios-clave');
  protected readonly actividadesClave = this.findCard<ItemListCard>('actividades-clave');
  protected readonly recursosClave    = this.findCard<ItemListCard>('recursos-clave');
  protected readonly propuestaValor   = this.findCard<ValuePropCard>('propuesta-valor');
  protected readonly relacionClientes = this.findCard<ItemListCard>('relacion-clientes');
  protected readonly canales          = this.findCard<ItemListCard>('canales');
  protected readonly segmentos        = this.findCard<SegmentsCard>('segmentos');
  protected readonly estructuraCostos = this.findCard<ItemListWithNoteCard>('estructura-costos');
  protected readonly fuentesIngreso   = this.findCard<ItemListWithNoteCard>('fuentes-ingreso');

  protected style(cardId: string): CardStyle {
    return CARD_STYLES[cardId];
  }

  protected tagColor(cardId: string, tag: string | undefined): BadgeColor {
    if (!tag) return 'slate';
    return TAG_COLORS[cardId]?.[tag] ?? 'slate';
  }

  protected tierBadgeColor(badge: string): BadgeColor {
    return TIER_BADGE_COLORS[badge] ?? 'slate';
  }

  private findCard<T extends CanvasCardBase>(id: string): T {
    const card = canvasData.cards.find(c => c.id === id);
    if (!card) throw new Error(`Canvas card not found: ${id}`);
    return card as unknown as T;
  }
}
