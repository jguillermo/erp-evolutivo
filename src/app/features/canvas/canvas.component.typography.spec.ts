import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const templateHtml        = readFileSync(join(__dir, 'canvas.component.html'), 'utf-8');
const cardSource          = readFileSync(join(__dir, '../../shared/components/card/card.component.ts'), 'utf-8');
const listItemSource      = readFileSync(join(__dir, '../../shared/components/list/list-item.component.ts'), 'utf-8');
const sectionSource       = readFileSync(join(__dir, '../../shared/components/section/section.component.ts'), 'utf-8');
const quotedTextSource    = readFileSync(join(__dir, '../../shared/components/quoted-text/quoted-text.component.ts'), 'utf-8');
const comparisonRowSource = readFileSync(join(__dir, '../../shared/components/comparison-row/comparison-row.component.ts'), 'utf-8');
const badgeLabelSource    = readFileSync(join(__dir, '../../shared/components/badge-label/badge-label.component.ts'), 'utf-8');
const globalCss           = readFileSync(join(__dir, '../../../styles.css'), 'utf-8');

describe('CanvasComponent — Typography', () => {

  // ── Card title (Tailwind classes in CardComponent source) ─────────────────

  it('card title uses text-xs token', () => {
    expect(cardSource).toContain('text-xs');
  });

  it('card title text-transform is uppercase', () => {
    expect(cardSource).toContain('uppercase');
  });

  it('card title letter-spacing is 1px (tracking-title)', () => {
    expect(cardSource).toContain('tracking-title');
  });

  it('card title margin-bottom is 8px (mb-lg)', () => {
    expect(cardSource).toContain('mb-lg');
  });

  it('card title display is flex', () => {
    expect(cardSource).toContain('flex items-center');
  });

  it('card title gap is 6px (gap-md)', () => {
    expect(cardSource).toContain('gap-md');
  });

  // ── List item (Tailwind classes in ListItemComponent) ─────────────────────

  it('list-item uses text-xs token', () => {
    expect(listItemSource).toContain('text-xs');
  });

  it('list-item line-height is 1.45 (leading-body)', () => {
    expect(listItemSource).toContain('leading-body');
  });

  it('list-item padding-left is 12px (pl-xl)', () => {
    expect(listItemSource).toContain('pl-xl');
  });

  it('list-item padding-top/bottom is 4px (py-sm)', () => {
    expect(listItemSource).toContain('py-sm');
  });

  it("list-item bullet content is '▸'", () => {
    expect(listItemSource).toContain("'▸'");
  });

  it('list-item bullet uses before:text-2xs token', () => {
    expect(listItemSource).toContain('before:text-2xs');
  });

  // ── Card question (Tailwind classes in CardComponent source) ──────────────

  it('card question uses text-2xs token', () => {
    expect(cardSource).toContain('text-2xs');
  });

  it('card question font-style is italic', () => {
    expect(cardSource).toContain('italic');
  });

  it('card question margin-bottom is 8px (mb-lg)', () => {
    expect(cardSource).toContain('mb-lg');
  });

  it('card question padding-bottom is 6px (pb-md)', () => {
    expect(cardSource).toContain('pb-md');
  });

  // ── Value statement (Tailwind in QuotedTextComponent) ────────────────────

  it('value-statement uses text-sm token', () => {
    expect(quotedTextSource).toContain('text-sm');
  });

  it('value-statement line-height is 1.5 (leading-normal)', () => {
    expect(quotedTextSource).toContain('leading-normal');
  });

  it('value-statement padding-left (pl-lg)', () => {
    expect(quotedTextSource).toContain('pl-lg');
  });

  it('value-statement is italic', () => {
    expect(quotedTextSource).toContain('italic');
  });

  // ── VS labels (Tailwind in ComparisonRowComponent) ───────────────────────

  it('vs-label uses text-2xs token', () => {
    expect(comparisonRowSource).toContain('text-2xs');
  });

  it('vs-label font-weight is bold (font-bold)', () => {
    expect(comparisonRowSource).toContain('font-bold');
  });

  it('vs-text uses text-xs token', () => {
    expect(comparisonRowSource).toContain('text-xs');
  });

  // ── Game section (inline Tailwind in canvas.component.html) ───────────────

  it('game-text uses text-xs token', () => {
    expect(templateHtml).toContain('text-xs');
  });

  it('game-text line-height is 1.45 (leading-body)', () => {
    expect(templateHtml).toContain('leading-body');
  });

  // ── Segment meta (inline Tailwind in canvas.component.html) ──────────────

  it('segment-meta has padding (px-md py-sm)', () => {
    expect(templateHtml).toContain('px-md');
    expect(templateHtml).toContain('py-sm');
  });

  it('segment tier desc uses text-2xs token', () => {
    expect(templateHtml).toContain('text-2xs');
  });

  // ── Beachhead (Tailwind in BadgeLabelComponent) ───────────────────────────

  it('beachhead title uses text-2xs token', () => {
    expect(badgeLabelSource).toContain('text-2xs');
  });

  it('beachhead title font-weight is bold (font-bold)', () => {
    expect(templateHtml).toContain('font-bold');
  });

  it('beachhead desc line-height is 1.4 (leading-cozy)', () => {
    expect(templateHtml).toContain('leading-cozy');
  });

  // ── Entry module (inline Tailwind in canvas.component.html) ──────────────

  it('entry-module-main uses text-sm token', () => {
    expect(templateHtml).toContain('text-sm');
  });

  it('entry-module-main font-weight is bold (font-bold)', () => {
    expect(templateHtml).toContain('font-bold');
  });

  it('entry-module-sub line-height is 1.35 (leading-condensed)', () => {
    expect(templateHtml).toContain('leading-condensed');
  });

  // ── Section note (Tailwind in SectionComponent) ───────────────────────────

  it('section note container uses text-xs token', () => {
    expect(sectionSource).toContain('text-xs');
  });

  it('section title uses text-2xs token', () => {
    expect(sectionSource).toContain('text-2xs');
  });

  it('section title font-weight is bold (font-bold in SectionComponent)', () => {
    expect(sectionSource).toContain('font-bold');
  });

  // ── Highlights font-weight (in styles.css) ────────────────────────────────

  it('.feat-tag uses font-semibold (600) via @apply in styles.css', () => {
    expect(globalCss).toContain('font-semibold');
  });

  // ── Card box dimensions (Tailwind classes in CardComponent source) ─────────

  it('card inner div border-radius is 10px (rounded-card)', () => {
    expect(cardSource).toContain('rounded-card');
  });

  it('card inner div padding is 12px (p-xl)', () => {
    expect(cardSource).toContain('p-xl');
  });

  it('card bar height (h-sm)', () => {
    expect(cardSource).toContain('h-sm');
  });

  it('card bar top border-radius (rounded-t-card)', () => {
    expect(cardSource).toContain('rounded-t-card');
  });
});
