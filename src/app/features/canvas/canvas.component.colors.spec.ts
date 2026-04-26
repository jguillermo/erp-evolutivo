import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasComponent } from './canvas.component';

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

describe('CanvasComponent — Colors', () => {
  let fixture: ComponentFixture<CanvasComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CanvasComponent] }).compileComponents();
    fixture = TestBed.createComponent(CanvasComponent);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  // ── Canvas block base ────────────────────────────────────────────────────

  it('canvas-block background is #1a1d27', () => {
    expect(cssContains('.canvas-block', 'background', '#1a1d27')).toBe(true);
  });

  it('canvas-block border is 1px solid #2a2d3a', () => {
    expect(cssContains('.canvas-block', 'border', '1px solid #2a2d3a')).toBe(true);
  });

  it('block-list li color is #b0b3c0', () => {
    expect(cssContains('.block-list li', 'color', '#b0b3c0')).toBe(true);
  });

  it('block-list li::before color is #666', () => {
    expect(cssContains('.block-list li::before', 'color', '#666')).toBe(true);
  });

  it('block-question color is #6b7280', () => {
    expect(cssContains('.block-question', 'color', '#6b7280')).toBe(true);
  });

  it('block-question border-bottom uses #2a2d3a', () => {
    expect(cssContains('.block-question', 'border-bottom', '1px dashed #2a2d3a')).toBe(true);
  });

  it('value-statement color is #e2e8f0', () => {
    expect(cssContains('.value-statement', 'color', '#e2e8f0')).toBe(true);
  });

  it('value-statement border-left uses #22d3ee', () => {
    expect(cssContains('.value-statement', 'border-left', '2px solid #22d3ee')).toBe(true);
  });

  // ── Highlight classes ─────────────────────────────────────────────────────

  it('.hl color is #c4b5fd', () => {
    expect(cssContains('.hl', 'color', '#c4b5fd')).toBe(true);
  });

  it('.hl2 color is #22d3ee', () => {
    expect(cssContains('.hl2', 'color', '#22d3ee')).toBe(true);
  });

  it('.hl3 color is #4ade80', () => {
    expect(cssContains('.hl3', 'color', '#4ade80')).toBe(true);
  });

  it('.hl-ai color is #f9a8d4', () => {
    expect(cssContains('.hl-ai', 'color', '#f9a8d4')).toBe(true);
  });

  // ── Cost badges ───────────────────────────────────────────────────────────

  it('cost-fixed color is #f87171', () => {
    expect(cssContains('.cost-fixed', 'color', '#f87171')).toBe(true);
  });

  it('cost-fixed background uses rgba(239,68,68,0.15)', () => {
    expect(cssContains('.cost-fixed', 'background', 'rgba(239,68,68,0.15)')).toBe(true);
  });

  it('cost-fixed border uses rgba(239,68,68,0.3)', () => {
    expect(cssContains('.cost-fixed', 'border', 'rgba(239,68,68,0.3)')).toBe(true);
  });

  it('cost-var color is #fb923c', () => {
    expect(cssContains('.cost-var', 'color', '#fb923c')).toBe(true);
  });

  it('cost-var background uses rgba(251,146,60,0.15)', () => {
    expect(cssContains('.cost-var', 'background', 'rgba(251,146,60,0.15)')).toBe(true);
  });

  it('cost-var border uses rgba(251,146,60,0.3)', () => {
    expect(cssContains('.cost-var', 'border', 'rgba(251,146,60,0.3)')).toBe(true);
  });

  // ── Revenue badges ────────────────────────────────────────────────────────

  it('revenue-main color is #4ade80', () => {
    expect(cssContains('.revenue-main', 'color', '#4ade80')).toBe(true);
  });

  it('revenue-main background uses rgba(74,222,128,0.15)', () => {
    expect(cssContains('.revenue-main', 'background', 'rgba(74,222,128,0.15)')).toBe(true);
  });

  it('revenue-sec color is #86efac', () => {
    expect(cssContains('.revenue-sec', 'color', '#86efac')).toBe(true);
  });

  it('revenue-sec background uses rgba(74,222,128,0.07)', () => {
    expect(cssContains('.revenue-sec', 'background', 'rgba(74,222,128,0.07)')).toBe(true);
  });

  it('revenue-future color is #f9a8d4', () => {
    expect(cssContains('.revenue-future', 'color', '#f9a8d4')).toBe(true);
  });

  it('revenue-future background uses rgba(249,168,212,0.1)', () => {
    expect(cssContains('.revenue-future', 'background', 'rgba(249,168,212,0.1)')).toBe(true);
  });

  it('revenue-future border uses rgba(249,168,212,0.2)', () => {
    expect(cssContains('.revenue-future', 'border', 'rgba(249,168,212,0.2)')).toBe(true);
  });

  // ── Fase badges ───────────────────────────────────────────────────────────

  it('fase1 color is #a5b4fc', () => {
    expect(cssContains('.fase1', 'color', '#a5b4fc')).toBe(true);
  });

  it('fase1 background uses rgba(99,102,241,0.2)', () => {
    expect(cssContains('.fase1', 'background', 'rgba(99,102,241,0.2)')).toBe(true);
  });

  it('fase1 border uses rgba(99,102,241,0.4)', () => {
    expect(cssContains('.fase1', 'border', 'rgba(99,102,241,0.4)')).toBe(true);
  });

  it('fase2 color is #94a3b8', () => {
    expect(cssContains('.fase2', 'color', '#94a3b8')).toBe(true);
  });

  it('fase2 background uses rgba(71,85,105,0.2)', () => {
    expect(cssContains('.fase2', 'background', 'rgba(71,85,105,0.2)')).toBe(true);
  });

  it('fase2 border uses rgba(71,85,105,0.35)', () => {
    expect(cssContains('.fase2', 'border', 'rgba(71,85,105,0.35)')).toBe(true);
  });

  // ── Canal badges ──────────────────────────────────────────────────────────

  it('canal1 color is #2dd4bf', () => {
    expect(cssContains('.canal1', 'color', '#2dd4bf')).toBe(true);
  });

  it('canal1 background uses rgba(20,184,166,0.25)', () => {
    expect(cssContains('.canal1', 'background', 'rgba(20,184,166,0.25)')).toBe(true);
  });

  it('canal2 color is #5eead4', () => {
    expect(cssContains('.canal2', 'color', '#5eead4')).toBe(true);
  });

  it('canal2 background uses rgba(20,184,166,0.12)', () => {
    expect(cssContains('.canal2', 'background', 'rgba(20,184,166,0.12)')).toBe(true);
  });

  it('canal3 color is #99f6e4', () => {
    expect(cssContains('.canal3', 'color', '#99f6e4')).toBe(true);
  });

  it('canal3 background uses rgba(20,184,166,0.06)', () => {
    expect(cssContains('.canal3', 'background', 'rgba(20,184,166,0.06)')).toBe(true);
  });

  // ── Segment badges ────────────────────────────────────────────────────────

  it('segment-meta color is #fbbf24', () => {
    expect(cssContains('.segment-meta', 'color', '#fbbf24')).toBe(true);
  });

  it('segment-meta background uses rgba(251,191,36,0.08)', () => {
    expect(cssContains('.segment-meta', 'background', 'rgba(251,191,36,0.08)')).toBe(true);
  });

  it('seg-growth color is #fbbf24', () => {
    expect(cssContains('.seg-growth', 'color', '#fbbf24')).toBe(true);
  });

  it('seg-growth background uses rgba(251,191,36,0.15)', () => {
    expect(cssContains('.seg-growth', 'background', 'rgba(251,191,36,0.15)')).toBe(true);
  });

  it('seg-established color is #fb923c', () => {
    expect(cssContains('.seg-established', 'color', '#fb923c')).toBe(true);
  });

  it('seg-established background uses rgba(249,115,22,0.15)', () => {
    expect(cssContains('.seg-established', 'background', 'rgba(249,115,22,0.15)')).toBe(true);
  });

  it('seg-desc color is #9ca3af', () => {
    expect(cssContains('.seg-desc', 'color', '#9ca3af')).toBe(true);
  });

  // ── Beachhead block ───────────────────────────────────────────────────────

  it('beachhead-block background uses rgba(217,119,6,0.07)', () => {
    expect(cssContains('.beachhead-block', 'background', 'rgba(217,119,6,0.07)')).toBe(true);
  });

  it('beachhead-block border uses rgba(217,119,6,0.4)', () => {
    expect(cssContains('.beachhead-block', 'border', 'rgba(217,119,6,0.4)')).toBe(true);
  });

  it('beachhead-title color is #fef3c7', () => {
    expect(cssContains('.beachhead-title', 'color', '#fef3c7')).toBe(true);
  });

  it('beachhead-desc color is #fde68a', () => {
    expect(cssContains('.beachhead-desc', 'color', '#fde68a')).toBe(true);
  });

  it('beachhead-block block-list li color is #e5e7eb', () => {
    expect(cssContains('.beachhead-block .block-list li', 'color', '#e5e7eb')).toBe(true);
  });

  it('seg-beachhead background is #d97706', () => {
    expect(cssContains('.seg-beachhead', 'background', '#d97706')).toBe(true);
  });

  it('seg-beachhead color is #fff', () => {
    expect(cssContains('.seg-beachhead', 'color', '#fff')).toBe(true);
  });

  // ── Entry module box ──────────────────────────────────────────────────────

  it('entry-module-box background uses rgba(6,182,212,0.09)', () => {
    expect(cssContains('.entry-module-box', 'background', 'rgba(6,182,212,0.09)')).toBe(true);
  });

  it('entry-module-box border uses rgba(6,182,212,0.35)', () => {
    expect(cssContains('.entry-module-box', 'border', 'rgba(6,182,212,0.35)')).toBe(true);
  });

  it('entry-module-label color is #67e8f9', () => {
    expect(cssContains('.entry-module-label', 'color', '#67e8f9')).toBe(true);
  });

  it('entry-module-main color is #e2e8f0', () => {
    expect(cssContains('.entry-module-main', 'color', '#e2e8f0')).toBe(true);
  });

  it('entry-module-sub color is #94a3b8', () => {
    expect(cssContains('.entry-module-sub', 'color', '#94a3b8')).toBe(true);
  });

  // ── Game section ──────────────────────────────────────────────────────────

  it('game-section background uses rgba(139,92,246,0.08)', () => {
    expect(cssContains('.game-section', 'background', 'rgba(139,92,246,0.08)')).toBe(true);
  });

  it('game-section border uses rgba(139,92,246,0.2)', () => {
    expect(cssContains('.game-section', 'border', 'rgba(139,92,246,0.2)')).toBe(true);
  });

  it('game-label color is #a78bfa', () => {
    expect(cssContains('.game-label', 'color', '#a78bfa')).toBe(true);
  });

  it('game-text color is #d1d5db', () => {
    expect(cssContains('.game-text', 'color', '#d1d5db')).toBe(true);
  });

  // ── VS section ────────────────────────────────────────────────────────────

  it('vs-section background uses rgba(6,182,212,0.06)', () => {
    expect(cssContains('.vs-section', 'background', 'rgba(6,182,212,0.06)')).toBe(true);
  });

  it('vs-label color is #94a3b8', () => {
    expect(cssContains('.vs-label', 'color', '#94a3b8')).toBe(true);
  });

  it('vs-text color is #e2e8f0', () => {
    expect(cssContains('.vs-text', 'color', '#e2e8f0')).toBe(true);
  });

  // ── Viability note ────────────────────────────────────────────────────────

  it('viability-note color is #94a3b8', () => {
    expect(cssContains('.viability-note', 'color', '#94a3b8')).toBe(true);
  });

  it('viability-note background uses rgba(255,255,255,0.03)', () => {
    expect(cssContains('.viability-note', 'background', 'rgba(255,255,255,0.03)')).toBe(true);
  });

  it('viability-note border-left uses #4b5563', () => {
    expect(cssContains('.viability-note', 'border-left', '2px solid #4b5563')).toBe(true);
  });

  // ── Block bar inline gradients (DOM) ──────────────────────────────────────

  const barGradients: [string, string, string][] = [
    ['Socios Clave',         '1', 'linear-gradient(90deg,#8b5cf6,#7c3aed)'],
    ['Actividades Clave',    '2', 'linear-gradient(90deg,#6366f1,#4f46e5)'],
    ['Recursos Clave',       '3', 'linear-gradient(90deg,#3b82f6,#2563eb)'],
    ['Propuesta de Valor',   '4', 'linear-gradient(90deg,#06b6d4,#0891b2)'],
    ['Relación Clientes',    '5', 'linear-gradient(90deg,#10b981,#059669)'],
    ['Canales',              '6', 'linear-gradient(90deg,#14b8a6,#0d9488)'],
    ['Segmentos',            '7', 'linear-gradient(90deg,#f59e0b,#d97706)'],
    ['Estructura de Costos', '8', 'linear-gradient(90deg,#ef4444,#dc2626)'],
    ['Fuentes de Ingreso',   '9', 'linear-gradient(90deg,#22c55e,#16a34a)'],
  ];

  barGradients.forEach(([name, nth, gradient]) => {
    it(`${name} — block-bar gradient contains correct colors`, () => {
      const bar = el.querySelector(`.canvas-block:nth-child(${nth}) .block-bar`) as HTMLElement;
      expect(bar).toBeTruthy();
      const raw = bar.getAttribute('style') ?? '';
      // Extract both hex colors from the gradient
      const colors = gradient.match(/#[0-9a-f]{6}/gi) ?? [];
      colors.forEach(color => expect(raw.toLowerCase()).toContain(color.toLowerCase()));
    });
  });

  // ── Block title inline colors (DOM) ───────────────────────────────────────

  const titleColors: [string, string, string][] = [
    ['Socios Clave',         '1', '#a78bfa'],
    ['Actividades Clave',    '2', '#818cf8'],
    ['Recursos Clave',       '3', '#60a5fa'],
    ['Propuesta de Valor',   '4', '#22d3ee'],
    ['Relación Clientes',    '5', '#34d399'],
    ['Canales',              '6', '#2dd4bf'],
    ['Segmentos',            '7', '#fbbf24'],
    ['Estructura de Costos', '8', '#f87171'],
    ['Fuentes de Ingreso',   '9', '#4ade80'],
  ];

  titleColors.forEach(([name, nth, color]) => {
    it(`${name} — block-title inline color is ${color}`, () => {
      const title = el.querySelector(`.canvas-block:nth-child(${nth}) .block-title`) as HTMLElement;
      expect(title).toBeTruthy();
      const raw = title.getAttribute('style') ?? '';
      expect(raw.toLowerCase()).toContain(color.toLowerCase());
    });
  });
});
