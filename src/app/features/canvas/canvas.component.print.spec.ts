import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const templateHtml   = readFileSync(join(__dir, 'canvas.component.html'), 'utf-8');
const cardSource     = readFileSync(join(__dir, '../../shared/components/card/card.component.ts'), 'utf-8');
const listItemSource = readFileSync(join(__dir, '../../shared/components/list/list-item.component.ts'), 'utf-8');
const sectionSource  = readFileSync(join(__dir, '../../shared/components/section/section.component.ts'), 'utf-8');
const globalCss      = readFileSync(join(__dir, '../../../styles.css'), 'utf-8');

describe('CanvasComponent — Print styles', () => {

  // ── Global @media print (in styles.css) ──────────────────────────────────

  it('@media print block is present in styles.css', () => {
    expect(globalCss).toContain('@media print');
  });

  it('@page A3 landscape is in styles.css', () => {
    expect(globalCss).toContain('A3 landscape');
  });

  it('body background is reset to #fff in print (styles.css)', () => {
    expect(globalCss).toContain('background: #fff !important');
  });

  it('header buttons are hidden in print (styles.css)', () => {
    expect(globalCss).toContain('header button');
    expect(globalCss).toContain('display: none !important');
  });

  // ── Canvas grid print layout (Tailwind print: classes in template) ────────

  it('canvas-grid has print:grid-cols-10', () => {
    expect(templateHtml).toContain('print:grid-cols-10');
  });

  it('canvas-grid has print:grid-rows-[auto_auto_auto]', () => {
    expect(templateHtml).toContain('print:grid-rows-[auto_auto_auto]');
  });

  it('canvas-grid has print:gap-1', () => {
    expect(templateHtml).toContain('print:gap-1');
  });

  it('canvas-grid has print:w-full', () => {
    expect(templateHtml).toContain('print:w-full');
  });

  it('canvas-grid has print:text-[9px]', () => {
    expect(templateHtml).toContain('print:text-[9px]');
  });

  // ── Card print grid positions (Tailwind print: classes in template) ───────

  const printPositions: [number, string, string][] = [
    [1, '1/3',  '1/3'],
    [2, '3/5',  '1/2'],
    [3, '3/5',  '2/3'],
    [4, '5/7',  '1/3'],
    [5, '7/9',  '1/2'],
    [6, '7/9',  '2/3'],
    [7, '9/11', '1/3'],
    [8, '1/6',  '3/4'],
    [9, '6/11', '3/4'],
  ];

  printPositions.forEach(([n, col, row]) => {
    it(`card-${n} has print:[grid-column:${col}]`, () => {
      expect(templateHtml).toContain(`print:[grid-column:${col}]`);
    });

    it(`card-${n} has print:[grid-row:${row}]`, () => {
      expect(templateHtml).toContain(`print:[grid-row:${row}]`);
    });
  });

  // ── Card print box styles (Tailwind print: classes in CardComponent) ──────

  it('card has print:rounded-[6px]', () => {
    expect(cardSource).toContain('print:rounded-[6px]');
  });

  it('card has print:px-[8px]', () => {
    expect(cardSource).toContain('print:px-[8px]');
  });

  it('card has print:py-[6px]', () => {
    expect(cardSource).toContain('print:py-[6px]');
  });

  it('card has print:break-inside-avoid', () => {
    expect(cardSource).toContain('print:break-inside-avoid');
  });

  it('card bar has print:h-[3px]', () => {
    expect(cardSource).toContain('print:h-[3px]');
  });

  it('card title has print:text-[8px]', () => {
    expect(cardSource).toContain('print:text-[8px]');
  });

  it('card title has print:mb-1', () => {
    expect(cardSource).toContain('print:mb-1');
  });

  it('card question has print:text-[6.5px]', () => {
    expect(cardSource).toContain('print:text-[6.5px]');
  });

  it('card question has print:pb-[3px]', () => {
    expect(cardSource).toContain('print:pb-[3px]');
  });

  // ── List item print (Tailwind print: classes in ListItemComponent) ────────

  it('list-item has print:text-[7.5px]', () => {
    expect(listItemSource).toContain('print:text-[7.5px]');
  });

  it('list-item has print:leading-[1.35]', () => {
    expect(listItemSource).toContain('print:leading-[1.35]');
  });

  it('list-item has print:py-[1.5px]', () => {
    expect(listItemSource).toContain('print:py-[1.5px]');
  });

  it('list-item has print:pl-[10px]', () => {
    expect(listItemSource).toContain('print:pl-[10px]');
  });

  it('list-item bullet has print:before:text-[6px]', () => {
    expect(listItemSource).toContain('print:before:text-[6px]');
  });

  // ── Section print (Tailwind print: classes in SectionComponent) ──────────

  it('section note has print:px-[6px]', () => {
    expect(sectionSource).toContain('print:px-[6px]');
  });

  it('section note has print:py-[3px]', () => {
    expect(sectionSource).toContain('print:py-[3px]');
  });

  it('section info/callout/highlight have print:py-[4px]', () => {
    expect(sectionSource).toContain('print:py-[4px]');
  });

  it('section title has print:text-[7px]', () => {
    expect(sectionSource).toContain('print:text-[7px]');
  });

  // ── Canvas inline print classes ───────────────────────────────────────────

  it('value-statement has print:text-[8px]', () => {
    expect(templateHtml).toContain('print:text-[8px]');
  });

  it('vs-text has print:text-[7.5px]', () => {
    expect(templateHtml).toContain('print:text-[7.5px]');
  });

  it('game-text has print:text-[7px]', () => {
    expect(templateHtml).toContain('print:text-[7px]');
  });

  it('segment-meta has print:text-[6.5px]', () => {
    expect(templateHtml).toContain('print:text-[6.5px]');
  });

  it('entry-module-main has print:text-[8px]', () => {
    expect(templateHtml).toContain('print:text-[8px]');
  });

  it('entry-module-sub has print:text-[6.5px]', () => {
    expect(templateHtml).toContain('print:text-[6.5px]');
  });

  it('beachhead title has print:text-[7px]', () => {
    expect(templateHtml).toContain('print:text-[7px]');
  });

  it('beachhead desc has print:text-[6.5px]', () => {
    expect(templateHtml).toContain('print:text-[6.5px]');
  });

  it('segment tier desc has print:text-[6.5px]', () => {
    expect(templateHtml).toContain('print:text-[6.5px]');
  });

  it('badge has print:text-[6px] (BadgeComponent)', () => {
    const badgeSource = readFileSync(
      join(__dir, '../../shared/components/badge/badge.component.ts'), 'utf-8'
    );
    expect(badgeSource).toContain('print:text-[6px]');
  });
});
