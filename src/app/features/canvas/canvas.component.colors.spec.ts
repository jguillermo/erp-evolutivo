import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasComponent } from './canvas.component';

const __dir = dirname(fileURLToPath(import.meta.url));
const templateHtml    = readFileSync(join(__dir, 'canvas.component.html'), 'utf-8');
const globalCss       = readFileSync(join(__dir, '../../../styles.css'), 'utf-8');
const sectionSource   = readFileSync(join(__dir, '../../shared/components/section/section.component.ts'), 'utf-8');
const listItemSource  = readFileSync(join(__dir, '../../shared/components/list/list-item.component.ts'), 'utf-8');

describe('CanvasComponent — Colors', () => {
  let fixture: ComponentFixture<CanvasComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CanvasComponent] }).compileComponents();
    fixture = TestBed.createComponent(CanvasComponent);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  // ── Canvas card base (Tailwind classes via DOM) ───────────────────────────

  it('card inner div has bg-surface class', () => {
    const inner = el.querySelector('[data-testid="card-1"] div') as HTMLElement;
    expect(inner).toBeTruthy();
    expect(inner.classList.contains('bg-surface')).toBe(true);
  });

  it('card inner div has border and border-border classes', () => {
    const inner = el.querySelector('[data-testid="card-1"] div') as HTMLElement;
    expect(inner.classList.contains('border')).toBe(true);
    expect(inner.classList.contains('border-border')).toBe(true);
  });

  it('card question has text-[#6b7280] class', () => {
    const q = el.querySelector('[data-testid="card-1-question"]') as HTMLElement;
    expect(q).toBeTruthy();
    expect(q.className).toContain('text-[#6b7280]');
  });

  it('card question has border-[#2a2d3a] class', () => {
    const q = el.querySelector('[data-testid="card-1-question"]') as HTMLElement;
    expect(q.className).toContain('border-[#2a2d3a]');
  });

  // ── Highlight utilities (defined in styles.css) ───────────────────────────

  it('.hl color #c4b5fd is defined in styles.css', () => {
    expect(globalCss).toContain('#c4b5fd');
  });

  it('.hl2 color #22d3ee is defined in styles.css', () => {
    expect(globalCss).toContain('#22d3ee');
  });

  it('.hl3 color #4ade80 is defined in styles.css', () => {
    expect(globalCss).toContain('#4ade80');
  });

  it('.hl-ai color #f9a8d4 is defined in styles.css', () => {
    expect(globalCss).toContain('#f9a8d4');
  });

  it('.hl, .hl2, .hl3, .hl-ai all have font-weight: 600 in styles.css', () => {
    const hlSection = globalCss.slice(globalCss.indexOf('.hl '), globalCss.indexOf('/* ===== List'));
    expect(hlSection.match(/font-weight: 600/g)?.length).toBeGreaterThanOrEqual(4);
  });

  // ── List item colors (Tailwind classes in ListItemComponent) ──────────────

  it('list-item text color is #b0b3c0 (text-[#b0b3c0] in ListItemComponent)', () => {
    expect(listItemSource).toContain('text-[#b0b3c0]');
  });

  it('list-item bullet color is #666 (before:text-[#666] in ListItemComponent)', () => {
    expect(listItemSource).toContain('before:text-[#666]');
  });

  // ── Section variant colors (Tailwind classes in SectionComponent) ──────────

  it('note variant background uses rgba(255,255,255,0.03)', () => {
    expect(sectionSource).toContain('rgba(255,255,255,0.03)');
  });

  it('note variant border uses #4b5563', () => {
    expect(sectionSource).toContain('#4b5563');
  });

  it('info variant background uses rgba(6,182,212,0.06)', () => {
    expect(sectionSource).toContain('rgba(6,182,212,0.06)');
  });

  it('callout variant background uses rgba(139,92,246,0.08)', () => {
    expect(sectionSource).toContain('rgba(139,92,246,0.08)');
  });

  it('callout variant border uses rgba(139,92,246,0.2)', () => {
    expect(sectionSource).toContain('rgba(139,92,246,0.2)');
  });

  it('callout variant title color is #a78bfa', () => {
    expect(sectionSource).toContain('#a78bfa');
  });

  it('highlight variant background uses rgba(217,119,6,0.07)', () => {
    expect(sectionSource).toContain('rgba(217,119,6,0.07)');
  });

  it('highlight variant border uses rgba(217,119,6,0.4)', () => {
    expect(sectionSource).toContain('rgba(217,119,6,0.4)');
  });

  it('highlight variant title color is #fef3c7', () => {
    expect(sectionSource).toContain('#fef3c7');
  });

  // ── Canvas inline colors (Tailwind classes in canvas.component.html) ──────

  it('value-statement border uses #22d3ee', () => {
    expect(templateHtml).toContain('border-[#22d3ee]');
  });

  it('segment-meta uses amber color #fbbf24', () => {
    expect(templateHtml).toContain('#fbbf24');
  });

  it('segment-meta background uses rgba(251,191,36,0.08)', () => {
    expect(templateHtml).toContain('rgba(251,191,36,0.08)');
  });

  it('beachhead title color is #fef3c7', () => {
    expect(templateHtml).toContain('text-[#fef3c7]');
  });

  it('beachhead desc color is #fde68a', () => {
    expect(templateHtml).toContain('text-[#fde68a]');
  });

  it('entry-module-main color is #e2e8f0', () => {
    expect(templateHtml).toContain('text-[#e2e8f0]');
  });

  it('vs-label color is #94a3b8', () => {
    expect(templateHtml).toContain('text-[#94a3b8]');
  });

  it('vs-text color is #e2e8f0', () => {
    expect(templateHtml).toContain('text-[#e2e8f0]');
  });

  it('game-text color is #d1d5db', () => {
    expect(templateHtml).toContain('text-[#d1d5db]');
  });

  it('segment tier desc color is #9ca3af', () => {
    expect(templateHtml).toContain('text-[#9ca3af]');
  });

  // ── Card bar gradient colors (Tailwind ngClass via DOM) ───────────────────

  const barColors: [string, number, string, string][] = [
    ['Socios Clave',         1, '#8b5cf6', '#7c3aed'],
    ['Actividades Clave',    2, '#6366f1', '#4f46e5'],
    ['Recursos Clave',       3, '#3b82f6', '#2563eb'],
    ['Propuesta de Valor',   4, '#06b6d4', '#0891b2'],
    ['Relación Clientes',    5, '#10b981', '#059669'],
    ['Canales',              6, '#14b8a6', '#0d9488'],
    ['Segmentos',            7, '#f59e0b', '#d97706'],
    ['Estructura de Costos', 8, '#ef4444', '#dc2626'],
    ['Fuentes de Ingreso',   9, '#22c55e', '#16a34a'],
  ];

  barColors.forEach(([name, n, from, to]) => {
    it(`${name} — card-${n}-bar has from-[${from}] class`, () => {
      const bar = el.querySelector(`[data-testid="card-${n}-bar"]`) as HTMLElement;
      expect(bar).toBeTruthy();
      expect(bar.className).toContain(`from-[${from}]`);
    });

    it(`${name} — card-${n}-bar has to-[${to}] class`, () => {
      const bar = el.querySelector(`[data-testid="card-${n}-bar"]`) as HTMLElement;
      expect(bar.className).toContain(`to-[${to}]`);
    });
  });

  // ── Card title colors (Tailwind ngClass via DOM) ──────────────────────────

  const titleColors: [string, number, string][] = [
    ['Socios Clave',         1, '#a78bfa'],
    ['Actividades Clave',    2, '#818cf8'],
    ['Recursos Clave',       3, '#60a5fa'],
    ['Propuesta de Valor',   4, '#22d3ee'],
    ['Relación Clientes',    5, '#34d399'],
    ['Canales',              6, '#2dd4bf'],
    ['Segmentos',            7, '#fbbf24'],
    ['Estructura de Costos', 8, '#f87171'],
    ['Fuentes de Ingreso',   9, '#4ade80'],
  ];

  titleColors.forEach(([name, n, color]) => {
    it(`${name} — card-${n}-title has text-[${color}] class`, () => {
      const title = el.querySelector(`[data-testid="card-${n}-title"]`) as HTMLElement;
      expect(title).toBeTruthy();
      expect(title.className).toContain(`text-[${color}]`);
    });
  });
});
