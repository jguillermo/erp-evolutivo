import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasComponent } from './canvas.component';

const __dir = dirname(fileURLToPath(import.meta.url));
const templateHtml = readFileSync(join(__dir, 'canvas.component.html'), 'utf-8');

// Extract a grid binding value for a given testId, e.g. gridColumn('card-1') → '1/3'
function gridBinding(attr: 'gridColumn' | 'gridRow', testId: string): string | null {
  const pattern = new RegExp(
    `testId="${testId}"[\\s\\S]*?\\[style\\.${attr}\\]="'([^']+)'"`,
  );
  return pattern.exec(templateHtml)?.[1] ?? null;
}

describe('CanvasComponent — Grid & Layout', () => {
  let fixture: ComponentFixture<CanvasComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CanvasComponent] }).compileComponents();
    fixture = TestBed.createComponent(CanvasComponent);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  // ── Canvas grid Tailwind classes (DOM) ────────────────────────────────────

  it('canvas grid has display:grid class', () => {
    const grid = el.querySelector('[data-testid="canvas-grid"]') as HTMLElement;
    expect(grid).toBeTruthy();
    expect(grid.classList.contains('grid')).toBe(true);
  });

  it('canvas grid has 10-column class (grid-cols-10)', () => {
    const grid = el.querySelector('[data-testid="canvas-grid"]') as HTMLElement;
    expect(grid.classList.contains('grid-cols-10')).toBe(true);
  });

  it('canvas grid has 3-row class (grid-rows-[auto_auto_auto])', () => {
    const grid = el.querySelector('[data-testid="canvas-grid"]') as HTMLElement;
    expect(grid.className).toContain('grid-rows-[auto_auto_auto]');
  });

  it('canvas grid has gap-[7px] class', () => {
    const grid = el.querySelector('[data-testid="canvas-grid"]') as HTMLElement;
    expect(grid.classList.contains('gap-[7px]')).toBe(true);
  });

  // ── Responsive breakpoints (Tailwind classes in template source) ──────────

  it('responsive 1000px breakpoint collapses to 2 columns', () => {
    expect(templateHtml).toContain('max-[1000px]:grid-cols-2');
  });

  it('responsive 600px breakpoint collapses to 1 column', () => {
    expect(templateHtml).toContain('max-[600px]:grid-cols-1');
  });

  it('responsive 1000px resets block grid-column to auto', () => {
    expect(templateHtml).toContain('max-[1000px]:[grid-column:auto]');
    expect(templateHtml).toContain('max-[1000px]:[grid-row:auto]');
  });

  // ── Canvas grid DOM identity ──────────────────────────────────────────────

  it('canvas grid element exists with both id and data-testid', () => {
    expect(el.querySelector('#canvas-grid')).toBeTruthy();
    expect(el.querySelector('[data-testid="canvas-grid"]')).toBeTruthy();
  });

  it('canvas grid contains exactly 9 app-card elements', () => {
    const cards = el.querySelectorAll('app-card');
    expect(cards.length).toBe(9);
  });

  // ── Block grid positions (verified against template source) ──────────────
  // jsdom does not support CSS grid properties in CSSStyleDeclaration,
  // so we verify the [style.gridColumn] / [style.gridRow] bindings in the template.

  const gridPositions: [string, string, string, string][] = [
    ['Socios Clave',         'card-1', '1/3',  '1/3'],
    ['Actividades Clave',    'card-2', '3/5',  '1'],
    ['Recursos Clave',       'card-3', '3/5',  '2'],
    ['Propuesta de Valor',   'card-4', '5/7',  '1/3'],
    ['Relación Clientes',    'card-5', '7/9',  '1'],
    ['Canales',              'card-6', '7/9',  '2'],
    ['Segmentos',            'card-7', '9/11', '1/3'],
    ['Estructura de Costos', 'card-8', '1/6',  '3'],
    ['Fuentes de Ingreso',   'card-9', '6/11', '3'],
  ];

  gridPositions.forEach(([name, testId, col, row]) => {
    it(`${name} — [style.gridColumn] is "${col}"`, () => {
      expect(gridBinding('gridColumn', testId)).toBe(col);
    });

    it(`${name} — [style.gridRow] is "${row}"`, () => {
      expect(gridBinding('gridRow', testId)).toBe(row);
    });
  });

  it('all 9 gridColumn bindings are present in the template', () => {
    const matches = templateHtml.match(/\[style\.gridColumn\]/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(9);
  });

  // ── Card bar position (Tailwind classes via DOM) ──────────────────────────

  it('card-bar is positioned absolute (absolute class)', () => {
    const bar = el.querySelector('[data-testid="card-1-bar"]') as HTMLElement;
    expect(bar).toBeTruthy();
    expect(bar.classList.contains('absolute')).toBe(true);
  });

  it('card-bar spans full width (inset-x-0 class)', () => {
    const bar = el.querySelector('[data-testid="card-1-bar"]') as HTMLElement;
    expect(bar.classList.contains('inset-x-0')).toBe(true);
  });

  it('card-bar is pinned to top (top-0 class)', () => {
    const bar = el.querySelector('[data-testid="card-1-bar"]') as HTMLElement;
    expect(bar.classList.contains('top-0')).toBe(true);
  });

  // ── Card inner div position / overflow ────────────────────────────────────

  it('card inner div is positioned relative', () => {
    const inner = el.querySelector('[data-testid="card-1"] div') as HTMLElement;
    expect(inner).toBeTruthy();
    expect(inner.classList.contains('relative')).toBe(true);
  });

  it('card inner div has overflow-hidden', () => {
    const inner = el.querySelector('[data-testid="card-1"] div') as HTMLElement;
    expect(inner.classList.contains('overflow-hidden')).toBe(true);
  });

  // ── Structural sub-layout (Tailwind classes in template) ────────────────

  it('beachhead-header has flex class', () => {
    expect(templateHtml).toContain('flex items-center gap-[6px]');
  });

  it('beachhead-header has items-center class', () => {
    expect(templateHtml).toContain('items-center');
  });

  it('beachhead-header has gap-[6px] class', () => {
    expect(templateHtml).toContain('gap-[6px]');
  });

  it('segment-tier has flex class', () => {
    expect(templateHtml).toContain('flex items-center');
  });

  it('segment-tier has gap-[6px] class', () => {
    expect(templateHtml).toContain('gap-[6px]');
  });

  it('segment-tier has top and bottom margin classes (mt-2 mb-[2px])', () => {
    expect(templateHtml).toContain('mt-2');
    expect(templateHtml).toContain('mb-[2px]');
  });
});
