import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const templateHtml = readFileSync(join(__dir, 'canvas.component.html'), 'utf-8');
const cardSource = readFileSync(join(__dir, '../../shared/components/card/card.component.ts'), 'utf-8');

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

  // ── Block title (Tailwind classes in CardComponent source) ────────────────

  it('block-title font-size is 0.72rem (text-[0.72rem])', () => {
    expect(cardSource).toContain('text-[0.72rem]');
  });

  it('block-title text-transform is uppercase', () => {
    expect(cardSource).toContain('uppercase');
  });

  it('block-title letter-spacing is 1px (tracking-[1px])', () => {
    expect(cardSource).toContain('tracking-[1px]');
  });

  it('block-title margin-bottom is 8px (mb-2)', () => {
    expect(cardSource).toContain('mb-2');
  });

  it('block-title display is flex', () => {
    expect(cardSource).toContain('flex items-center');
  });

  it('block-title align-items is center (items-center)', () => {
    expect(cardSource).toContain('items-center');
  });

  it('block-title gap is 5px (gap-[5px])', () => {
    expect(cardSource).toContain('gap-[5px]');
  });

  // ── Block list (CSS in <style> tag) ───────────────────────────────────────

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

  // ── Block question (Tailwind classes in CardComponent source) ─────────────

  it('block-question font-size is 0.65rem (text-[0.65rem])', () => {
    expect(cardSource).toContain('text-[0.65rem]');
  });

  it('block-question font-style is italic', () => {
    expect(cardSource).toContain('italic');
  });

  it('block-question margin-bottom is 8px (mb-2)', () => {
    expect(cardSource).toContain('mb-2');
  });

  it('block-question padding-bottom is 6px (pb-[6px])', () => {
    expect(cardSource).toContain('pb-[6px]');
  });

  // ── Value statement (CSS in <style> tag) ──────────────────────────────────

  it('value-statement font-size is 0.78rem', () => {
    expect(cssContains('.value-statement', 'font-size', '0.78rem')).toBe(true);
  });

  it('value-statement line-height is 1.5', () => {
    expect(cssContains('.value-statement', 'line-height', '1.5')).toBe(true);
  });

  it('value-statement padding-left is 8px', () => {
    expect(cssContains('.value-statement', 'padding-left', '8px')).toBe(true);
  });

  // ── VS section (CSS in <style> tag) ───────────────────────────────────────

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

  // ── Game section (CSS in <style> tag) ─────────────────────────────────────

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

  // ── Fase badge (CSS in <style> tag) ──────────────────────────────────────

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

  // ── Canal badge (CSS in <style> tag) ─────────────────────────────────────

  it('canal-badge font-size is 0.55rem', () => {
    expect(cssContains('.canal-badge', 'font-size', '0.55rem')).toBe(true);
  });

  it('canal-badge font-weight is 700', () => {
    expect(cssContains('.canal-badge', 'font-weight', '700')).toBe(true);
  });

  it('canal-badge letter-spacing is 0.5px', () => {
    expect(cssContains('.canal-badge', 'letter-spacing', '0.5px')).toBe(true);
  });

  // ── Segment meta (CSS in <style> tag) ────────────────────────────────────

  it('segment-meta font-size is 0.68rem', () => {
    expect(cssContains('.segment-meta', 'font-size', '0.68rem')).toBe(true);
  });

  it('segment-meta padding is 3px 6px', () => {
    expect(cssContains('.segment-meta', 'padding', '3px 6px')).toBe(true);
  });

  // ── Seg badge (CSS in <style> tag) ───────────────────────────────────────

  it('seg-badge font-size is 0.55rem', () => {
    expect(cssContains('.seg-badge', 'font-size', '0.55rem')).toBe(true);
  });

  it('seg-badge font-weight is 700', () => {
    expect(cssContains('.seg-badge', 'font-weight', '700')).toBe(true);
  });

  it('seg-badge letter-spacing is 0.5px', () => {
    expect(cssContains('.seg-badge', 'letter-spacing', '0.5px')).toBe(true);
  });

  it('seg-desc font-size is 0.62rem', () => {
    expect(cssContains('.seg-desc', 'font-size', '0.62rem')).toBe(true);
  });

  // ── Beachhead block (CSS in <style> tag) ─────────────────────────────────

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

  // ── Entry module (CSS in <style> tag) ────────────────────────────────────

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

  // ── Cost / revenue badges (CSS in <style> tag) ───────────────────────────

  it('cost-fixed font-size is 0.58rem', () => {
    expect(cssContains('.cost-fixed', 'font-size', '0.58rem')).toBe(true);
  });

  it('cost-fixed font-weight is 700', () => {
    expect(cssContains('.cost-fixed', 'font-weight', '700')).toBe(true);
  });

  it('cost-fixed letter-spacing is 0.5px', () => {
    expect(cssContains('.cost-fixed', 'letter-spacing', '0.5px')).toBe(true);
  });

  it('cost-var font-size is 0.58rem', () => {
    expect(cssContains('.cost-var', 'font-size', '0.58rem')).toBe(true);
  });

  it('revenue-main font-size is 0.58rem', () => {
    expect(cssContains('.revenue-main', 'font-size', '0.58rem')).toBe(true);
  });

  it('revenue-sec font-size is 0.58rem', () => {
    expect(cssContains('.revenue-sec', 'font-size', '0.58rem')).toBe(true);
  });

  it('revenue-future font-size is 0.58rem', () => {
    expect(cssContains('.revenue-future', 'font-size', '0.58rem')).toBe(true);
  });

  // ── Viability note (CSS in <style> tag) ──────────────────────────────────

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

  // ── Card box dimensions (Tailwind classes in CardComponent source) ────────

  it('card inner div border-radius is 10px (rounded-[10px])', () => {
    expect(cardSource).toContain('rounded-[10px]');
  });

  it('card inner div padding is 12px (p-3 = 0.75rem = 12px)', () => {
    expect(cardSource).toContain('p-3');
  });

  it('card bar height is 3px (h-[3px])', () => {
    expect(cardSource).toContain('h-[3px]');
  });

  it('card bar top border-radius (rounded-t-[10px])', () => {
    expect(cardSource).toContain('rounded-t-[10px]');
  });

  // ── Highlights font-weight (CSS in <style> tag) ───────────────────────────

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
