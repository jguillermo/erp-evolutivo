import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const templateHtml = readFileSync(join(__dir, 'canvas.component.html'), 'utf-8');
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

  // ── Canvas grid print layout ──────────────────────────────────────────────

  it('canvas-grid keeps 10-column layout in print', () => {
    expect(printContains('grid-template-columns: repeat(10, 1fr) !important')).toBe(true);
  });

  it('canvas-grid keeps 3-row layout in print', () => {
    expect(printContains('grid-template-rows: auto auto auto !important')).toBe(true);
  });

  it('canvas-grid gap is 4px in print', () => {
    expect(printContains('gap: 4px !important')).toBe(true);
  });

  it('canvas-grid width is 100% in print', () => {
    expect(printContains('width: 100% !important')).toBe(true);
  });

  it('canvas-grid font-size is 9px in print', () => {
    expect(printContains('font-size: 9px !important')).toBe(true);
  });

  // ── Block nth-child grid positions in print ───────────────────────────────

  const printPositions: [number, string, string][] = [
    [1, '1/3 !important', '1/3 !important'],
    [2, '3/5 !important', '1/2 !important'],
    [3, '3/5 !important', '2/3 !important'],
    [4, '5/7 !important', '1/3 !important'],
    [5, '7/9 !important', '1/2 !important'],
    [6, '7/9 !important', '2/3 !important'],
    [7, '9/11 !important', '1/3 !important'],
    [8, '1/6 !important', '3/4 !important'],
    [9, '6/11 !important', '3/4 !important'],
  ];

  printPositions.forEach(([nth, col, row]) => {
    it(`canvas-block:nth-child(${nth}) print grid-column is ${col}`, () => {
      expect(printContains(`.canvas-block:nth-child(${nth}) { grid-column: ${col}`)).toBe(true);
    });

    it(`canvas-block:nth-child(${nth}) print grid-row is ${row}`, () => {
      expect(printContains(`grid-row: ${row}`)).toBe(true);
    });
  });

  // ── Block print box styles ────────────────────────────────────────────────

  it('canvas-block border-radius is 6px in print', () => {
    expect(printContains('border-radius: 6px !important')).toBe(true);
  });

  it('canvas-block padding is 6px 8px in print', () => {
    expect(printContains('padding: 6px 8px !important')).toBe(true);
  });

  it('canvas-block has break-inside: avoid in print', () => {
    expect(printContains('break-inside: avoid')).toBe(true);
  });

  it('canvas-block box-shadow is none in print', () => {
    expect(printContains('box-shadow: none !important')).toBe(true);
  });

  it('block-bar height stays 3px in print', () => {
    expect(printContains('.block-bar { height: 3px !important')).toBe(true);
  });

  // ── Typography overrides in print ─────────────────────────────────────────

  it('block-title font-size is 8px in print', () => {
    expect(printContains('.block-title { font-size: 8px !important')).toBe(true);
  });

  it('block-title margin-bottom is 4px in print', () => {
    expect(printContains('margin-bottom: 4px !important')).toBe(true);
  });

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

  it('block-question font-size is 6.5px in print', () => {
    expect(printContains('font-size: 6.5px !important')).toBe(true);
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
