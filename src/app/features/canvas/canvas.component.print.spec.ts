import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const templateHtml = readFileSync(join(__dir, 'canvas.component.html'), 'utf-8');
const cardSource = readFileSync(join(__dir, '../../shared/components/card/card.component.ts'), 'utf-8');

const styleMatch = /<style>([\s\S]*?)<\/style>/.exec(templateHtml);
const css = styleMatch ? styleMatch[1] : '';

// Extract from @media print to end of CSS — the print block is always last in the style tag
const printStart = css.indexOf('@media print');
const printCss = printStart >= 0 ? css.slice(printStart) : '';

function printContains(value: string): boolean {
  return printCss.replace(/\s+/g, ' ').includes(value.replace(/\s+/g, ' '));
}

describe('CanvasComponent — Print styles', () => {

  // ── @media print block exists ─────────────────────────────────────────────

  it('@media print block is present in the template', () => {
    expect(css).toContain('@media print');
  });

  // ── @page rule ────────────────────────────────────────────────────────────

  it('@page sets A3 landscape', () => {
    expect(printContains('size: A3 landscape')).toBe(true);
  });

  it('@page margin is 6mm', () => {
    expect(printContains('margin: 6mm')).toBe(true);
  });

  // ── Color adjust ──────────────────────────────────────────────────────────

  it('print-color-adjust: exact is set', () => {
    expect(printContains('print-color-adjust: exact !important')).toBe(true);
  });

  it('-webkit-print-color-adjust: exact is set', () => {
    expect(printContains('-webkit-print-color-adjust: exact !important')).toBe(true);
  });

  // ── Background reset ──────────────────────────────────────────────────────

  it('body background is reset to #fff in print', () => {
    expect(printContains('background: #fff !important')).toBe(true);
  });

  it('body margin is reset to 0 in print', () => {
    expect(printContains('margin: 0 !important')).toBe(true);
  });

  it('body padding is reset to 0 in print', () => {
    expect(printContains('padding: 0 !important')).toBe(true);
  });

  // ── Elements hidden in print ──────────────────────────────────────────────

  it('nav is hidden in print', () => {
    expect(printContains('display: none !important')).toBe(true);
    expect(printCss).toContain('nav');
  });

  it('.no-print is hidden in print', () => {
    expect(printCss).toContain('.no-print');
  });

  it('.tab-bar is hidden in print', () => {
    expect(printCss).toContain('.tab-bar');
  });

  // ── Canvas grid print layout (Tailwind print: classes in template) ────────

  it('canvas-grid keeps 10-column layout in print (print:grid-cols-10)', () => {
    expect(templateHtml).toContain('print:grid-cols-10');
  });

  it('canvas-grid keeps 3-row layout in print (print:grid-rows-[auto_auto_auto])', () => {
    expect(templateHtml).toContain('print:grid-rows-[auto_auto_auto]');
  });

  it('canvas-grid gap is reduced in print (print:gap-1)', () => {
    expect(templateHtml).toContain('print:gap-1');
  });

  it('canvas-grid is full width in print (print:w-full)', () => {
    expect(templateHtml).toContain('print:w-full');
  });

  it('canvas-grid font-size is 9px in print (print:text-[9px])', () => {
    expect(templateHtml).toContain('print:text-[9px]');
  });

  // ── Block print grid positions (Tailwind print: classes in template) ──────

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
    it(`card-${n} print grid-column is ${col} (print:[grid-column:${col}])`, () => {
      expect(templateHtml).toContain(`print:[grid-column:${col}]`);
    });

    it(`card-${n} print grid-row is ${row} (print:[grid-row:${row}])`, () => {
      expect(templateHtml).toContain(`print:[grid-row:${row}]`);
    });
  });

  // ── Card print box styles (Tailwind print: classes in CardComponent) ──────

  it('card has smaller border-radius in print (print:rounded-[6px])', () => {
    expect(cardSource).toContain('print:rounded-[6px]');
  });

  it('card has horizontal padding 8px in print (print:px-[8px])', () => {
    expect(cardSource).toContain('print:px-[8px]');
  });

  it('card has vertical padding 6px in print (print:py-[6px])', () => {
    expect(cardSource).toContain('print:py-[6px]');
  });

  it('card has white background in print (print:bg-white)', () => {
    expect(cardSource).toContain('print:bg-white');
  });

  it('card has break-inside: avoid in print (print:break-inside-avoid)', () => {
    expect(cardSource).toContain('print:break-inside-avoid');
  });

  it('block-bar height stays 3px in print (print:h-[3px])', () => {
    expect(cardSource).toContain('print:h-[3px]');
  });

  // ── Typography overrides in print (Tailwind print: classes in CardComponent) ──

  it('block-title font-size is 8px in print (print:text-[8px])', () => {
    expect(cardSource).toContain('print:text-[8px]');
  });

  it('block-title margin-bottom reduced in print (print:mb-1)', () => {
    expect(cardSource).toContain('print:mb-1');
  });

  it('block-question font-size is 6.5px in print (print:text-[6.5px])', () => {
    expect(cardSource).toContain('print:text-[6.5px]');
  });

  it('block-question padding-bottom reduced in print (print:pb-[3px])', () => {
    expect(cardSource).toContain('print:pb-[3px]');
  });

  // ── Block list print (CSS in <style> @media print) ────────────────────────

  // ── Color overrides for white background ─────────────────────────────────

  it('block-list li text is dark in print (#374151)', () => {
    expect(printContains('.block-list li { color: #374151 !important')).toBe(true);
  });

  it('.hl color darkened for print (#6d28d9)', () => {
    expect(printContains('.hl { color: #6d28d9 !important')).toBe(true);
  });

  it('.hl-ai color darkened for print (#9d174d)', () => {
    expect(printContains('.hl-ai { color: #9d174d !important')).toBe(true);
  });

  it('beachhead-block gets light background in print (#fffbeb)', () => {
    expect(printContains('.beachhead-block { background: #fffbeb !important')).toBe(true);
  });

  it('vs-section gets light background in print (#f0fdfa)', () => {
    expect(printContains('.vs-section { background: #f0fdfa !important')).toBe(true);
  });

  it('game-section gets light background in print (#f5f3ff)', () => {
    expect(printContains('.game-section { background: #f5f3ff !important')).toBe(true);
  });

  it('entry-module-box gets light background in print (#ecfeff)', () => {
    expect(printContains('.entry-module-box { background: #ecfeff !important')).toBe(true);
  });

  it('viability-note gets light background in print (#f8fafc)', () => {
    expect(printContains('.viability-note { background: #f8fafc !important')).toBe(true);
  });

  // ── Typography overrides in print (CSS @media print) ─────────────────────

  it('block-list li font-size is 7.5px in print', () => {
    expect(printContains('font-size: 7.5px !important')).toBe(true);
  });

  it('block-list li line-height is 1.35 in print', () => {
    expect(printContains('line-height: 1.35 !important')).toBe(true);
  });

  it('block-list li padding is 1.5px 0 1.5px 10px in print', () => {
    expect(printContains('padding: 1.5px 0 1.5px 10px !important')).toBe(true);
  });

  it('block-list li::before font-size is 6px in print', () => {
    expect(printContains('.block-list li::before { font-size: 6px !important')).toBe(true);
  });

  it('value-statement font-size is 8px in print', () => {
    expect(printContains('.value-statement { font-size: 8px !important')).toBe(true);
  });

  it('vs-label font-size is 7px in print', () => {
    expect(printContains('.vs-label { font-size: 7px !important')).toBe(true);
  });

  it('vs-text font-size is 7.5px in print', () => {
    expect(printContains('.vs-text { font-size: 7.5px !important')).toBe(true);
  });

  it('game-label font-size is 7px in print', () => {
    expect(printContains('.game-label { font-size: 7px !important')).toBe(true);
  });

  it('game-text font-size is 7px in print', () => {
    expect(printContains('.game-text { font-size: 7px !important')).toBe(true);
  });

  it('seg-badge font-size is 6px in print', () => {
    expect(printContains('.seg-badge { font-size: 6px !important')).toBe(true);
  });

  it('seg-desc font-size is 6.5px in print', () => {
    expect(printContains('.seg-desc { font-size: 6.5px !important')).toBe(true);
  });

  it('cost-fixed and cost-var font-size is 6px in print', () => {
    expect(printContains('.cost-fixed, .cost-var')).toBe(true);
    expect(printContains('font-size: 6px !important')).toBe(true);
  });

  it('revenue-main, revenue-sec and revenue-future font-size is 6px in print', () => {
    expect(printContains('.revenue-main, .revenue-sec, .revenue-future')).toBe(true);
  });

  it('viability-note font-size is 7px in print', () => {
    expect(printContains('.viability-note { font-size: 7px !important')).toBe(true);
  });

  it('viability-note padding is 3px 6px in print', () => {
    expect(printContains('padding: 3px 6px !important')).toBe(true);
  });

  it('fase-badge and canal-badge font-size is 6px in print', () => {
    expect(printContains('.fase-badge, .canal-badge { font-size: 6px !important')).toBe(true);
  });

  it('beachhead-block padding is 4px 6px in print', () => {
    expect(printContains('.beachhead-block { padding: 4px 6px !important')).toBe(true);
  });

  it('beachhead-title font-size is 7px in print', () => {
    expect(printContains('.beachhead-title { font-size: 7px !important')).toBe(true);
  });

  it('beachhead-desc font-size is 6.5px in print', () => {
    expect(printContains('.beachhead-desc { font-size: 6.5px !important')).toBe(true);
  });

  it('beachhead block-list li font-size is 7px in print', () => {
    expect(printContains('.beachhead-block .block-list li { font-size: 7px !important')).toBe(true);
  });

  it('entry-module-box padding is 4px 6px in print', () => {
    expect(printContains('.entry-module-box { padding: 4px 6px !important')).toBe(true);
  });

  it('entry-module-label font-size is 6.5px in print', () => {
    expect(printContains('.entry-module-label { font-size: 6.5px !important')).toBe(true);
  });

  it('entry-module-main font-size is 8px in print', () => {
    expect(printContains('.entry-module-main { font-size: 8px !important')).toBe(true);
  });

  it('entry-module-sub font-size is 6.5px in print', () => {
    expect(printContains('.entry-module-sub { font-size: 6.5px !important')).toBe(true);
  });

  it('segment-meta font-size is 6.5px in print', () => {
    expect(printContains('.segment-meta { font-size: 6.5px !important')).toBe(true);
  });

  it('segment-tier margin is 4px 0 1px 0 in print', () => {
    expect(printContains('.segment-tier { margin: 4px 0 1px 0 !important')).toBe(true);
  });

  it('vs-section padding is 4px 6px in print', () => {
    expect(printContains('.vs-section { padding: 4px 6px !important')).toBe(true);
  });

  it('game-section padding is 4px 6px in print', () => {
    expect(printContains('.game-section { padding: 4px 6px !important')).toBe(true);
  });
});
