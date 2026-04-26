import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const templateHtml = readFileSync(join(__dir, 'canvas.component.html'), 'utf-8');
const styleMatch = /<style>([\s\S]*?)<\/style>/.exec(templateHtml);
const css = styleMatch ? styleMatch[1] : '';

function cssContains(selector: string, property: string, value: string): boolean {
  const normalized = css.replace(/\s+/g, ' ');
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const ruleRx = new RegExp(esc(selector) + '\\s*\\{([^}]+)\\}');
  const ruleMatch = ruleRx.exec(normalized);
  if (!ruleMatch) return false;
  const propRx = new RegExp(esc(property) + '\\s*:\\s*([^;]+)');
  const propMatch = propRx.exec(ruleMatch[1]);
  return propMatch ? propMatch[1].includes(value) : false;
}

describe('CanvasComponent — Typography', () => {

  // ── Block title ───────────────────────────────────────────────────────────

  it('block-title font-size is 0.72rem', () => {
    expect(cssContains('.block-title', 'font-size', '0.72rem')).toBe(true);
  });

  it('block-title text-transform is uppercase', () => {
    expect(cssContains('.block-title', 'text-transform', 'uppercase')).toBe(true);
  });

  it('block-title letter-spacing is 1px', () => {
    expect(cssContains('.block-title', 'letter-spacing', '1px')).toBe(true);
  });

  it('block-title margin-bottom is 8px', () => {
    expect(cssContains('.block-title', 'margin-bottom', '8px')).toBe(true);
  });

  it('block-title display is flex', () => {
    expect(cssContains('.block-title', 'display', 'flex')).toBe(true);
  });

  it('block-title align-items is center', () => {
    expect(cssContains('.block-title', 'align-items', 'center')).toBe(true);
  });

  it('block-title gap is 5px', () => {
    expect(cssContains('.block-title', 'gap', '5px')).toBe(true);
  });

  // ── Block list ────────────────────────────────────────────────────────────

  it('block-list li font-size is 0.74rem', () => {
    expect(cssContains('.block-list li', 'font-size', '0.74rem')).toBe(true);
  });

  it('block-list li line-height is 1.45', () => {
    expect(cssContains('.block-list li', 'line-height', '1.45')).toBe(true);
  });

  it('block-list li padding is 3px 0 3px 12px', () => {
    expect(cssContains('.block-list li', 'padding', '3px 0 3px 12px')).toBe(true);
  });

  it('block-list li::before font-size is 0.65rem', () => {
    expect(cssContains('.block-list li::before', 'font-size', '0.65rem')).toBe(true);
  });

  it("block-list li::before content is '▸'", () => {
    expect(css).toContain("content: '▸'");
  });

  // ── Block question ────────────────────────────────────────────────────────

  it('block-question font-size is 0.65rem', () => {
    expect(cssContains('.block-question', 'font-size', '0.65rem')).toBe(true);
  });

  it('block-question font-style is italic', () => {
    expect(cssContains('.block-question', 'font-style', 'italic')).toBe(true);
  });

  it('block-question margin-bottom is 8px', () => {
    expect(cssContains('.block-question', 'margin-bottom', '8px')).toBe(true);
  });

  it('block-question padding-bottom is 6px', () => {
    expect(cssContains('.block-question', 'padding-bottom', '6px')).toBe(true);
  });

  // ── Value statement ───────────────────────────────────────────────────────

  it('value-statement font-size is 0.78rem', () => {
    expect(cssContains('.value-statement', 'font-size', '0.78rem')).toBe(true);
  });

  it('value-statement line-height is 1.5', () => {
    expect(cssContains('.value-statement', 'line-height', '1.5')).toBe(true);
  });

  it('value-statement font-style is italic', () => {
    expect(cssContains('.value-statement', 'font-style', 'italic')).toBe(true);
  });

  it('value-statement padding-left is 8px', () => {
    expect(cssContains('.value-statement', 'padding-left', '8px')).toBe(true);
  });

  // ── Segment meta ──────────────────────────────────────────────────────────

  it('segment-meta font-size is 0.68rem', () => {
    expect(cssContains('.segment-meta', 'font-size', '0.68rem')).toBe(true);
  });

  it('segment-meta border-radius is 4px', () => {
    expect(cssContains('.segment-meta', 'border-radius', '4px')).toBe(true);
  });

  it('segment-meta padding is 3px 6px', () => {
    expect(cssContains('.segment-meta', 'padding', '3px 6px')).toBe(true);
  });

  it('segment-meta margin-bottom is 4px', () => {
    expect(cssContains('.segment-meta', 'margin-bottom', '4px')).toBe(true);
  });

  // ── Cost badges ───────────────────────────────────────────────────────────

  it('cost-fixed font-size is 0.58rem', () => {
    expect(cssContains('.cost-fixed', 'font-size', '0.58rem')).toBe(true);
  });

  it('cost-fixed font-weight is 700', () => {
    expect(cssContains('.cost-fixed', 'font-weight', '700')).toBe(true);
  });

  it('cost-fixed letter-spacing is 0.5px', () => {
    expect(cssContains('.cost-fixed', 'letter-spacing', '0.5px')).toBe(true);
  });

  it('cost-fixed border-radius is 3px', () => {
    expect(cssContains('.cost-fixed', 'border-radius', '3px')).toBe(true);
  });

  it('cost-fixed padding is 1px 4px', () => {
    expect(cssContains('.cost-fixed', 'padding', '1px 4px')).toBe(true);
  });

  it('cost-var font-size is 0.58rem', () => {
    expect(cssContains('.cost-var', 'font-size', '0.58rem')).toBe(true);
  });

  it('cost-var font-weight is 700', () => {
    expect(cssContains('.cost-var', 'font-weight', '700')).toBe(true);
  });

  it('cost-var letter-spacing is 0.5px', () => {
    expect(cssContains('.cost-var', 'letter-spacing', '0.5px')).toBe(true);
  });

  // ── Revenue badges ────────────────────────────────────────────────────────

  it('revenue-main font-size is 0.58rem', () => {
    expect(cssContains('.revenue-main', 'font-size', '0.58rem')).toBe(true);
  });

  it('revenue-main font-weight is 700', () => {
    expect(cssContains('.revenue-main', 'font-weight', '700')).toBe(true);
  });

  it('revenue-main letter-spacing is 0.5px', () => {
    expect(cssContains('.revenue-main', 'letter-spacing', '0.5px')).toBe(true);
  });

  it('revenue-sec font-size is 0.58rem', () => {
    expect(cssContains('.revenue-sec', 'font-size', '0.58rem')).toBe(true);
  });

  it('revenue-future font-size is 0.58rem', () => {
    expect(cssContains('.revenue-future', 'font-size', '0.58rem')).toBe(true);
  });

  it('revenue-future font-weight is 700', () => {
    expect(cssContains('.revenue-future', 'font-weight', '700')).toBe(true);
  });

  // ── Fase badges ───────────────────────────────────────────────────────────

  it('fase-badge font-size is 0.55rem', () => {
    expect(cssContains('.fase-badge', 'font-size', '0.55rem')).toBe(true);
  });

  it('fase-badge font-weight is 700', () => {
    expect(cssContains('.fase-badge', 'font-weight', '700')).toBe(true);
  });

  it('fase-badge letter-spacing is 0.5px', () => {
    expect(cssContains('.fase-badge', 'letter-spacing', '0.5px')).toBe(true);
  });

  it('fase-badge border-radius is 3px', () => {
    expect(cssContains('.fase-badge', 'border-radius', '3px')).toBe(true);
  });

  it('fase-badge padding is 1px 4px', () => {
    expect(cssContains('.fase-badge', 'padding', '1px 4px')).toBe(true);
  });

  it('fase-badge white-space is nowrap', () => {
    expect(cssContains('.fase-badge', 'white-space', 'nowrap')).toBe(true);
  });

  // ── Canal badges ──────────────────────────────────────────────────────────

  it('canal-badge font-size is 0.55rem', () => {
    expect(cssContains('.canal-badge', 'font-size', '0.55rem')).toBe(true);
  });

  it('canal-badge font-weight is 700', () => {
    expect(cssContains('.canal-badge', 'font-weight', '700')).toBe(true);
  });

  it('canal-badge letter-spacing is 0.5px', () => {
    expect(cssContains('.canal-badge', 'letter-spacing', '0.5px')).toBe(true);
  });

  // ── Segment badges ────────────────────────────────────────────────────────

  it('seg-badge font-size is 0.55rem', () => {
    expect(cssContains('.seg-badge', 'font-size', '0.55rem')).toBe(true);
  });

  it('seg-badge font-weight is 700', () => {
    expect(cssContains('.seg-badge', 'font-weight', '700')).toBe(true);
  });

  it('seg-badge letter-spacing is 0.5px', () => {
    expect(cssContains('.seg-badge', 'letter-spacing', '0.5px')).toBe(true);
  });

  it('seg-badge padding is 1px 5px', () => {
    expect(cssContains('.seg-badge', 'padding', '1px 5px')).toBe(true);
  });

  it('seg-badge white-space is nowrap', () => {
    expect(cssContains('.seg-badge', 'white-space', 'nowrap')).toBe(true);
  });

  it('seg-desc font-size is 0.62rem', () => {
    expect(cssContains('.seg-desc', 'font-size', '0.62rem')).toBe(true);
  });

  it('seg-desc line-height is 1.3', () => {
    expect(cssContains('.seg-desc', 'line-height', '1.3')).toBe(true);
  });

  // ── Beachhead block ───────────────────────────────────────────────────────

  it('beachhead-block padding is 7px 9px', () => {
    expect(cssContains('.beachhead-block', 'padding', '7px 9px')).toBe(true);
  });

  it('beachhead-block border-radius is 6px', () => {
    expect(cssContains('.beachhead-block', 'border-radius', '6px')).toBe(true);
  });

  it('beachhead-title font-size is 0.65rem', () => {
    expect(cssContains('.beachhead-title', 'font-size', '0.65rem')).toBe(true);
  });

  it('beachhead-title font-weight is 700', () => {
    expect(cssContains('.beachhead-title', 'font-weight', '700')).toBe(true);
  });

  it('beachhead-desc font-size is 0.62rem', () => {
    expect(cssContains('.beachhead-desc', 'font-size', '0.62rem')).toBe(true);
  });

  it('beachhead-desc line-height is 1.4', () => {
    expect(cssContains('.beachhead-desc', 'line-height', '1.4')).toBe(true);
  });

  it('seg-beachhead font-size is 0.58rem', () => {
    expect(cssContains('.seg-beachhead', 'font-size', '0.58rem')).toBe(true);
  });

  // ── Entry module box ──────────────────────────────────────────────────────

  it('entry-module-box padding is 7px 10px', () => {
    expect(cssContains('.entry-module-box', 'padding', '7px 10px')).toBe(true);
  });

  it('entry-module-box border-radius is 7px', () => {
    expect(cssContains('.entry-module-box', 'border-radius', '7px')).toBe(true);
  });

  it('entry-module-label font-size is 0.62rem', () => {
    expect(cssContains('.entry-module-label', 'font-size', '0.62rem')).toBe(true);
  });

  it('entry-module-label font-weight is 700', () => {
    expect(cssContains('.entry-module-label', 'font-weight', '700')).toBe(true);
  });

  it('entry-module-main font-size is 0.8rem', () => {
    expect(cssContains('.entry-module-main', 'font-size', '0.8rem')).toBe(true);
  });

  it('entry-module-main font-weight is 700', () => {
    expect(cssContains('.entry-module-main', 'font-weight', '700')).toBe(true);
  });

  it('entry-module-sub font-size is 0.63rem', () => {
    expect(cssContains('.entry-module-sub', 'font-size', '0.63rem')).toBe(true);
  });

  it('entry-module-sub line-height is 1.35', () => {
    expect(cssContains('.entry-module-sub', 'line-height', '1.35')).toBe(true);
  });

  // ── Game section ──────────────────────────────────────────────────────────

  it('game-section padding is 6px 8px', () => {
    expect(cssContains('.game-section', 'padding', '6px 8px')).toBe(true);
  });

  it('game-section border-radius is 6px', () => {
    expect(cssContains('.game-section', 'border-radius', '6px')).toBe(true);
  });

  it('game-label font-size is 0.65rem', () => {
    expect(cssContains('.game-label', 'font-size', '0.65rem')).toBe(true);
  });

  it('game-label font-weight is 700', () => {
    expect(cssContains('.game-label', 'font-weight', '700')).toBe(true);
  });

  it('game-text font-size is 0.68rem', () => {
    expect(cssContains('.game-text', 'font-size', '0.68rem')).toBe(true);
  });

  it('game-text line-height is 1.45', () => {
    expect(cssContains('.game-text', 'line-height', '1.45')).toBe(true);
  });

  // ── VS section ────────────────────────────────────────────────────────────

  it('vs-section padding is 6px 8px', () => {
    expect(cssContains('.vs-section', 'padding', '6px 8px')).toBe(true);
  });

  it('vs-section border-radius is 6px', () => {
    expect(cssContains('.vs-section', 'border-radius', '6px')).toBe(true);
  });

  it('vs-label font-size is 0.65rem', () => {
    expect(cssContains('.vs-label', 'font-size', '0.65rem')).toBe(true);
  });

  it('vs-label font-weight is 700', () => {
    expect(cssContains('.vs-label', 'font-weight', '700')).toBe(true);
  });

  it('vs-text font-size is 0.72rem', () => {
    expect(cssContains('.vs-text', 'font-size', '0.72rem')).toBe(true);
  });

  it('vs-text padding-left is 8px', () => {
    expect(cssContains('.vs-text', 'padding-left', '8px')).toBe(true);
  });

  // ── Viability note ────────────────────────────────────────────────────────

  it('viability-note font-size is 0.68rem', () => {
    expect(cssContains('.viability-note', 'font-size', '0.68rem')).toBe(true);
  });

  it('viability-note padding is 5px 8px', () => {
    expect(cssContains('.viability-note', 'padding', '5px 8px')).toBe(true);
  });

  it('viability-note border-radius is 4px', () => {
    expect(cssContains('.viability-note', 'border-radius', '4px')).toBe(true);
  });

  it('viability-note margin-top is 8px', () => {
    expect(cssContains('.viability-note', 'margin-top', '8px')).toBe(true);
  });

  // ── Canvas block box ──────────────────────────────────────────────────────

  it('canvas-block border-radius is 10px', () => {
    expect(cssContains('.canvas-block', 'border-radius', '10px')).toBe(true);
  });

  it('canvas-block padding is 12px', () => {
    expect(cssContains('.canvas-block', 'padding', '12px')).toBe(true);
  });

  it('block-bar height is 3px', () => {
    expect(cssContains('.block-bar', 'height', '3px')).toBe(true);
  });

  it('block-bar border-radius is 10px 10px 0 0', () => {
    expect(cssContains('.block-bar', 'border-radius', '10px 10px 0 0')).toBe(true);
  });

  // ── Highlights font-weight ────────────────────────────────────────────────

  it('.hl font-weight is 600', () => {
    expect(cssContains('.hl', 'font-weight', '600')).toBe(true);
  });

  it('.hl2 font-weight is 600', () => {
    expect(cssContains('.hl2', 'font-weight', '600')).toBe(true);
  });

  it('.hl3 font-weight is 600', () => {
    expect(cssContains('.hl3', 'font-weight', '600')).toBe(true);
  });

  it('.hl-ai font-weight is 600', () => {
    expect(cssContains('.hl-ai', 'font-weight', '600')).toBe(true);
  });
});
