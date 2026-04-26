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

describe('CanvasComponent — Grid & Layout', () => {
  let fixture: ComponentFixture<CanvasComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CanvasComponent] }).compileComponents();
    fixture = TestBed.createComponent(CanvasComponent);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  // ── Canvas grid CSS ───────────────────────────────────────────────────────

  it('canvas-grid display is grid', () => {
    expect(cssContains('.canvas-grid', 'display', 'grid')).toBe(true);
  });

  it('canvas-grid has 10 equal columns', () => {
    expect(cssContains('.canvas-grid', 'grid-template-columns', 'repeat(10, 1fr)')).toBe(true);
  });

  it('canvas-grid has 3 auto rows', () => {
    expect(cssContains('.canvas-grid', 'grid-template-rows', 'auto auto auto')).toBe(true);
  });

  it('canvas-grid gap is 7px', () => {
    expect(cssContains('.canvas-grid', 'gap', '7px')).toBe(true);
  });

  // ── Responsive breakpoints ────────────────────────────────────────────────

  it('responsive 1000px breakpoint collapses to 2 columns', () => {
    expect(css).toContain('max-width: 1000px');
    expect(css).toContain('grid-template-columns: 1fr 1fr !important');
  });

  it('responsive 600px breakpoint collapses to 1 column', () => {
    expect(css).toContain('max-width: 600px');
    expect(css).toContain('grid-template-columns: 1fr !important');
  });

  it('responsive 1000px resets block grid-column to auto', () => {
    expect(css).toContain('grid-column: auto !important');
    expect(css).toContain('grid-row: auto !important');
  });

  // ── Canvas grid DOM ───────────────────────────────────────────────────────

  it('canvas grid element exists with id canvas-grid', () => {
    const grid = el.querySelector('#canvas-grid');
    expect(grid).toBeTruthy();
    expect(grid!.classList.contains('canvas-grid')).toBe(true);
  });

  it('canvas grid contains exactly 9 canvas-block elements', () => {
    const blocks = el.querySelectorAll('.canvas-block');
    expect(blocks.length).toBe(9);
  });

  // ── Block inline grid positions (verified against template source) ──────────
  // jsdom does not support CSS grid properties in CSSStyleDeclaration,
  // so we verify the raw style attributes directly in the template HTML.

  const gridPositions: [string, string, string][] = [
    ['Socios Clave',         'grid-column:1/3',  'grid-row:1/3'],
    ['Actividades Clave',    'grid-column:3/5',  'grid-row:1'],
    ['Recursos Clave',       'grid-column:3/5',  'grid-row:2'],
    ['Propuesta de Valor',   'grid-column:5/7',  'grid-row:1/3'],
    ['Relación Clientes',    'grid-column:7/9',  'grid-row:1'],
    ['Canales',              'grid-column:7/9',  'grid-row:2'],
    ['Segmentos',            'grid-column:9/11', 'grid-row:1/3'],
    ['Estructura de Costos', 'grid-column:1/6',  'grid-row:3'],
    ['Fuentes de Ingreso',   'grid-column:6/11', 'grid-row:3'],
  ];

  gridPositions.forEach(([name, colDecl, rowDecl]) => {
    it(`${name} — template contains "${colDecl}"`, () => {
      expect(templateHtml).toContain(colDecl);
    });

    it(`${name} — template contains "${rowDecl}"`, () => {
      expect(templateHtml).toContain(rowDecl);
    });
  });

  it('all 9 grid-column declarations are present in the template', () => {
    const matches = templateHtml.match(/grid-column:[^;'"]+/g) ?? [];
    // Each block has grid-column declared at least once (9 blocks)
    expect(matches.length).toBeGreaterThanOrEqual(9);
  });

  // ── Block bar position CSS ────────────────────────────────────────────────

  it('block-bar is positioned absolute at top:0 left:0 right:0', () => {
    expect(cssContains('.block-bar', 'position', 'absolute')).toBe(true);
    expect(cssContains('.block-bar', 'top', '0')).toBe(true);
    expect(cssContains('.block-bar', 'left', '0')).toBe(true);
    expect(cssContains('.block-bar', 'right', '0')).toBe(true);
  });

  it('canvas-block is positioned relative', () => {
    expect(cssContains('.canvas-block', 'position', 'relative')).toBe(true);
  });

  it('canvas-block overflow is hidden', () => {
    expect(cssContains('.canvas-block', 'overflow', 'hidden')).toBe(true);
  });

  // ── Structural sub-layout ─────────────────────────────────────────────────

  it('beachhead-header display is flex', () => {
    expect(cssContains('.beachhead-header', 'display', 'flex')).toBe(true);
  });

  it('beachhead-header align-items is center', () => {
    expect(cssContains('.beachhead-header', 'align-items', 'center')).toBe(true);
  });

  it('beachhead-header gap is 6px', () => {
    expect(cssContains('.beachhead-header', 'gap', '6px')).toBe(true);
  });

  it('segment-tier display is flex', () => {
    expect(cssContains('.segment-tier', 'display', 'flex')).toBe(true);
  });

  it('segment-tier align-items is center', () => {
    expect(cssContains('.segment-tier', 'align-items', 'center')).toBe(true);
  });

  it('segment-tier gap is 6px', () => {
    expect(cssContains('.segment-tier', 'gap', '6px')).toBe(true);
  });

  it('segment-tier margin is 6px 0 2px 0', () => {
    expect(cssContains('.segment-tier', 'margin', '6px 0 2px 0')).toBe(true);
  });
});
