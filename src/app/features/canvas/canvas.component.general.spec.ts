import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasComponent } from './canvas.component';

describe('CanvasComponent — General Structure', () => {
  let fixture: ComponentFixture<CanvasComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CanvasComponent] }).compileComponents();
    fixture = TestBed.createComponent(CanvasComponent);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  // ── Block count ───────────────────────────────────────────────────────────

  it('renders exactly 9 canvas-block elements', () => {
    expect(el.querySelectorAll('.canvas-block').length).toBe(9);
  });

  it('every canvas-block has a block-bar', () => {
    el.querySelectorAll('.canvas-block').forEach(block => {
      expect(block.querySelector('.block-bar')).toBeTruthy();
    });
  });

  it('every canvas-block has a block-title', () => {
    el.querySelectorAll('.canvas-block').forEach(block => {
      expect(block.querySelector('.block-title')).toBeTruthy();
    });
  });

  it('every canvas-block has a block-question', () => {
    el.querySelectorAll('.canvas-block').forEach(block => {
      expect(block.querySelector('.block-question')).toBeTruthy();
    });
  });

  // ── Block titles content ──────────────────────────────────────────────────

  const expectedTitles = [
    [1, 'Socios Clave'],
    [2, 'Actividades Clave'],
    [3, 'Recursos Clave'],
    [4, 'Propuesta de Valor'],
    [5, 'Relación Clientes'],
    [6, 'Canales'],
    [7, 'Segmentos de Clientes'],
    [8, 'Estructura de Costos'],
    [9, 'Fuentes de Ingreso'],
  ] as [number, string][];

  expectedTitles.forEach(([nth, title]) => {
    it(`block ${nth} title contains "${title}"`, () => {
      const t = el.querySelector(`.canvas-block:nth-child(${nth}) .block-title`);
      expect(t?.textContent?.trim()).toContain(title);
    });
  });

  // ── Block title emojis ────────────────────────────────────────────────────

  const expectedEmojis: [number, string][] = [
    [1, '🤝'],
    [2, '⚙️'],
    [3, '🔧'],
    [4, '💎'],
    [5, '💬'],
    [6, '📡'],
    [7, '👥'],
    [8, '💸'],
    [9, '💰'],
  ];

  expectedEmojis.forEach(([nth, emoji]) => {
    it(`block ${nth} title contains emoji ${emoji}`, () => {
      const t = el.querySelector(`.canvas-block:nth-child(${nth}) .block-title`);
      expect(t?.textContent).toContain(emoji);
    });
  });

  // ── Block questions content ───────────────────────────────────────────────

  const expectedQuestions: [number, string][] = [
    [1, '¿Qué no puedo o no me conviene hacer solo?'],
    [2, '¿Qué tenemos que hacer sí o sí para entregar la propuesta de valor?'],
    [3, '¿Sin qué recursos no podemos operar?'],
    [4, '¿Qué problema resuelvo y por qué me elegirían?'],
    [5, '¿Cómo los capto, retengo y hago que crezcan conmigo?'],
    [6, '¿Cómo me conocen, cómo compran y cómo reciben el producto?'],
    [7, '¿Para quién es? ¿Quién paga? ¿Quién usa?'],
    [8, '¿Cuáles son los gastos principales? ¿Los ingresos los superan?'],
    [9, '¿Cómo gano dinero? ¿Hay ingresos recurrentes? ¿Cuánto están dispuestos a pagar?'],
  ];

  expectedQuestions.forEach(([nth, question]) => {
    it(`block ${nth} question matches expected text`, () => {
      const q = el.querySelector(`.canvas-block:nth-child(${nth}) .block-question`);
      expect(q?.textContent?.trim()).toBe(question);
    });
  });

  // ── Propuesta de Valor special sections ───────────────────────────────────

  it('Propuesta de Valor contains value-statement paragraph', () => {
    const pv = el.querySelector('.canvas-block:nth-child(4)');
    expect(pv?.querySelector('.value-statement')).toBeTruthy();
  });

  it('Propuesta de Valor contains vs-section', () => {
    const pv = el.querySelector('.canvas-block:nth-child(4)');
    expect(pv?.querySelector('.vs-section')).toBeTruthy();
  });

  it('Propuesta de Valor vs-section has 3 vs-label elements', () => {
    const pv = el.querySelector('.canvas-block:nth-child(4)');
    expect(pv?.querySelectorAll('.vs-label').length).toBe(3);
  });

  it('Propuesta de Valor contains game-section', () => {
    const pv = el.querySelector('.canvas-block:nth-child(4)');
    expect(pv?.querySelector('.game-section')).toBeTruthy();
  });

  it('Propuesta de Valor game-label contains Mecánica de videojuego', () => {
    const pv = el.querySelector('.canvas-block:nth-child(4)');
    expect(pv?.querySelector('.game-label')?.textContent).toContain('Mecánica de videojuego');
  });

  it('Propuesta de Valor contains entry-module-box', () => {
    const pv = el.querySelector('.canvas-block:nth-child(4)');
    expect(pv?.querySelector('.entry-module-box')).toBeTruthy();
  });

  it('entry-module-label contains Módulo de arranque', () => {
    const pv = el.querySelector('.canvas-block:nth-child(4)');
    expect(pv?.querySelector('.entry-module-label')?.textContent).toContain('Módulo de arranque');
  });

  it('entry-module-main mentions Ventas + Inventario', () => {
    const pv = el.querySelector('.canvas-block:nth-child(4)');
    expect(pv?.querySelector('.entry-module-main')?.textContent).toContain('Ventas + Inventario');
  });

  // ── Segmentos special sections ────────────────────────────────────────────

  it('Segmentos contains segment-meta', () => {
    const seg = el.querySelector('.canvas-block:nth-child(7)');
    expect(seg?.querySelector('.segment-meta')).toBeTruthy();
  });

  it('segment-meta mentions Perú', () => {
    const meta = el.querySelector('.segment-meta');
    expect(meta?.textContent).toContain('Perú');
  });

  it('Segmentos contains beachhead-block', () => {
    const seg = el.querySelector('.canvas-block:nth-child(7)');
    expect(seg?.querySelector('.beachhead-block')).toBeTruthy();
  });

  it('beachhead-block contains seg-beachhead badge', () => {
    const bh = el.querySelector('.beachhead-block');
    expect(bh?.querySelector('.seg-beachhead')).toBeTruthy();
  });

  it('seg-beachhead text is BEACHHEAD', () => {
    expect(el.querySelector('.seg-beachhead')?.textContent?.trim()).toBe('BEACHHEAD');
  });

  it('Segmentos has seg-growth badge with text FASE 2', () => {
    const seg = el.querySelector('.canvas-block:nth-child(7)');
    const badge = seg?.querySelector('.seg-growth');
    expect(badge?.textContent?.trim()).toBe('FASE 2');
  });

  it('Segmentos has seg-established badge with text FASE 3', () => {
    const seg = el.querySelector('.canvas-block:nth-child(7)');
    const badge = seg?.querySelector('.seg-established');
    expect(badge?.textContent?.trim()).toBe('FASE 3');
  });

  // ── Estructura de Costos ──────────────────────────────────────────────────

  it('Estructura de Costos contains cost-fixed badges', () => {
    const costos = el.querySelector('.canvas-block:nth-child(8)');
    expect(costos?.querySelectorAll('.cost-fixed').length).toBeGreaterThanOrEqual(3);
  });

  it('Estructura de Costos contains cost-var badges', () => {
    const costos = el.querySelector('.canvas-block:nth-child(8)');
    expect(costos?.querySelectorAll('.cost-var').length).toBeGreaterThanOrEqual(3);
  });

  it('Estructura de Costos contains viability-note', () => {
    const costos = el.querySelector('.canvas-block:nth-child(8)');
    expect(costos?.querySelector('.viability-note')).toBeTruthy();
  });

  it('Estructura de Costos viability-note mentions Viabilidad', () => {
    const costos = el.querySelector('.canvas-block:nth-child(8)');
    expect(costos?.querySelector('.viability-note')?.textContent).toContain('Viabilidad');
  });

  // ── Fuentes de Ingreso ────────────────────────────────────────────────────

  it('Fuentes de Ingreso contains revenue-main badges', () => {
    const ingresos = el.querySelector('.canvas-block:nth-child(9)');
    expect(ingresos?.querySelectorAll('.revenue-main').length).toBeGreaterThanOrEqual(2);
  });

  it('Fuentes de Ingreso contains revenue-sec badges', () => {
    const ingresos = el.querySelector('.canvas-block:nth-child(9)');
    expect(ingresos?.querySelectorAll('.revenue-sec').length).toBeGreaterThanOrEqual(2);
  });

  it('Fuentes de Ingreso contains revenue-future badges', () => {
    const ingresos = el.querySelector('.canvas-block:nth-child(9)');
    expect(ingresos?.querySelectorAll('.revenue-future').length).toBeGreaterThanOrEqual(2);
  });

  it('Fuentes de Ingreso contains viability-note', () => {
    const ingresos = el.querySelector('.canvas-block:nth-child(9)');
    expect(ingresos?.querySelector('.viability-note')).toBeTruthy();
  });

  it('Fuentes de Ingreso viability-note mentions Odoo', () => {
    const ingresos = el.querySelector('.canvas-block:nth-child(9)');
    expect(ingresos?.querySelector('.viability-note')?.textContent).toContain('Odoo');
  });

  // ── Fase badges ───────────────────────────────────────────────────────────

  it('Actividades Clave contains fase-badge elements', () => {
    const act = el.querySelector('.canvas-block:nth-child(2)');
    expect(act?.querySelectorAll('.fase-badge').length).toBeGreaterThan(0);
  });

  it('Actividades Clave contains fase1 badges', () => {
    const act = el.querySelector('.canvas-block:nth-child(2)');
    expect(act?.querySelectorAll('.fase1').length).toBeGreaterThanOrEqual(3);
  });

  it('Actividades Clave contains fase2 badges', () => {
    const act = el.querySelector('.canvas-block:nth-child(2)');
    expect(act?.querySelectorAll('.fase2').length).toBeGreaterThanOrEqual(3);
  });

  // ── Canal badges ──────────────────────────────────────────────────────────

  it('Canales contains canal1, canal2 and canal3 badges', () => {
    const canales = el.querySelector('.canvas-block:nth-child(6)');
    expect(canales?.querySelector('.canal1')).toBeTruthy();
    expect(canales?.querySelector('.canal2')).toBeTruthy();
    expect(canales?.querySelector('.canal3')).toBeTruthy();
  });

  it('canal1 text is CANAL #1', () => {
    expect(el.querySelector('.canal1')?.textContent?.trim()).toBe('CANAL #1');
  });

  it('canal2 text is CANAL #2', () => {
    expect(el.querySelector('.canal2')?.textContent?.trim()).toBe('CANAL #2');
  });

  it('canal3 text is CANAL #3', () => {
    expect(el.querySelector('.canal3')?.textContent?.trim()).toBe('CANAL #3');
  });

  // ── Highlight classes presence ────────────────────────────────────────────

  it('at least one .hl element exists', () => {
    expect(el.querySelectorAll('.hl').length).toBeGreaterThan(0);
  });

  it('at least one .hl2 element exists', () => {
    expect(el.querySelectorAll('.hl2').length).toBeGreaterThan(0);
  });

  it('at least one .hl3 element exists', () => {
    expect(el.querySelectorAll('.hl3').length).toBeGreaterThan(0);
  });

  it('at least one .hl-ai element exists', () => {
    expect(el.querySelectorAll('.hl-ai').length).toBeGreaterThan(0);
  });

  // ── Block list items ──────────────────────────────────────────────────────

  it('each canvas-block has at least one block-list li', () => {
    el.querySelectorAll('.canvas-block').forEach(block => {
      const items = block.querySelectorAll('.block-list li');
      expect(items.length).toBeGreaterThan(0);
    });
  });

  // ── Container max-width ───────────────────────────────────────────────────

  it('outer container has max-w-[1200px] class', () => {
    const container = el.querySelector('.max-w-\\[1200px\\]');
    expect(container).toBeTruthy();
  });
});
