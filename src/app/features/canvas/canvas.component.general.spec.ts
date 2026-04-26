import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasComponent } from './canvas.component';

const sel = (id: string) => `[data-testid="${id}"]`;

describe('CanvasComponent — General Structure', () => {
  let fixture: ComponentFixture<CanvasComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CanvasComponent] }).compileComponents();
    fixture = TestBed.createComponent(CanvasComponent);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  // ── Canvas grid ───────────────────────────────────────────────────────────

  it('canvas grid exists with data-testid="canvas-grid"', () => {
    expect(el.querySelector(sel('canvas-grid'))).toBeTruthy();
  });

  it('canvas grid has id="canvas-grid"', () => {
    expect(el.querySelector('#canvas-grid')).toBeTruthy();
  });

  // ── All 9 cards present ───────────────────────────────────────────────────

  for (let n = 1; n <= 9; n++) {
    it(`card-${n} exists`, () => {
      expect(el.querySelector(sel(`card-${n}`))).toBeTruthy();
    });

    it(`card-${n}-bar exists`, () => {
      expect(el.querySelector(sel(`card-${n}-bar`))).toBeTruthy();
    });

    it(`card-${n}-title exists`, () => {
      expect(el.querySelector(sel(`card-${n}-title`))).toBeTruthy();
    });

    it(`card-${n}-question exists`, () => {
      expect(el.querySelector(sel(`card-${n}-question`))).toBeTruthy();
    });
  }

  // card-7 has three named lists (beachhead-list, list-2, list-3) — tested separately below
  for (const n of [1, 2, 3, 4, 5, 6, 8, 9]) {
    it(`card-${n}-list exists`, () => {
      expect(el.querySelector(sel(`card-${n}-list`))).toBeTruthy();
    });
  }

  // ── Card titles content ───────────────────────────────────────────────────

  const titles: [number, string][] = [
    [1, 'Socios Clave'],
    [2, 'Actividades Clave'],
    [3, 'Recursos Clave'],
    [4, 'Propuesta de Valor'],
    [5, 'Relación Clientes'],
    [6, 'Canales'],
    [7, 'Segmentos de Clientes'],
    [8, 'Estructura de Costos'],
    [9, 'Fuentes de Ingreso'],
  ];

  titles.forEach(([n, text]) => {
    it(`card-${n}-title contains "${text}"`, () => {
      expect(el.querySelector(sel(`card-${n}-title`))?.textContent?.trim()).toContain(text);
    });
  });

  // ── Card title emojis ─────────────────────────────────────────────────────

  const emojis: [number, string][] = [
    [1, '🤝'], [2, '⚙️'], [3, '🔧'], [4, '💎'],
    [5, '💬'], [6, '📡'], [7, '👥'], [8, '💸'], [9, '💰'],
  ];

  emojis.forEach(([n, emoji]) => {
    it(`card-${n}-title contains emoji ${emoji}`, () => {
      expect(el.querySelector(sel(`card-${n}-title`))?.textContent).toContain(emoji);
    });
  });

  // ── Card questions content ────────────────────────────────────────────────

  const questions: [number, string][] = [
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

  questions.forEach(([n, question]) => {
    it(`card-${n}-question matches expected text`, () => {
      expect(el.querySelector(sel(`card-${n}-question`))?.textContent?.trim()).toBe(question);
    });
  });

  // ── Card list items ───────────────────────────────────────────────────────

  it('each card-list has at least one li', () => {
    for (const n of [1, 2, 3, 4, 5, 6, 8, 9]) {
      const list = el.querySelector(sel(`card-${n}-list`));
      expect(list?.querySelectorAll('li').length).toBeGreaterThan(0);
    }
    // card-7 uses named lists
    expect(el.querySelector(sel('card-7-beachhead-list'))?.querySelectorAll('li').length).toBeGreaterThan(0);
    expect(el.querySelector(sel('card-7-list-2'))?.querySelectorAll('li').length).toBeGreaterThan(0);
    expect(el.querySelector(sel('card-7-list-3'))?.querySelectorAll('li').length).toBeGreaterThan(0);
  });

  // ── Card 4 — Propuesta de Valor special sections ──────────────────────────

  it('card-4-value-statement exists', () => {
    expect(el.querySelector(sel('card-4-value-statement'))).toBeTruthy();
  });

  it('card-4-value-statement mentions PYMEs', () => {
    expect(el.querySelector(sel('card-4-value-statement'))?.textContent).toContain('PYMEs');
  });

  it('card-4-vs exists', () => {
    expect(el.querySelector(sel('card-4-vs'))).toBeTruthy();
  });

  it('card-4-vs has 3 vs-label elements', () => {
    expect(el.querySelector(sel('card-4-vs'))?.querySelectorAll('.vs-label').length).toBe(3);
  });

  it('card-4-game exists', () => {
    expect(el.querySelector(sel('card-4-game'))).toBeTruthy();
  });

  it('card-4-game label contains Mecánica de videojuego', () => {
    expect(el.querySelector(sel('card-4-game'))?.querySelector('.game-label')?.textContent)
      .toContain('Mecánica de videojuego');
  });

  it('card-4-entry-module exists', () => {
    expect(el.querySelector(sel('card-4-entry-module'))).toBeTruthy();
  });

  it('card-4-entry-module label contains Módulo de arranque', () => {
    expect(el.querySelector(sel('card-4-entry-module'))?.querySelector('.entry-module-label')?.textContent)
      .toContain('Módulo de arranque');
  });

  it('card-4-entry-module main mentions Ventas + Inventario', () => {
    expect(el.querySelector(sel('card-4-entry-module'))?.querySelector('.entry-module-main')?.textContent)
      .toContain('Ventas + Inventario');
  });

  // ── Card 7 — Segmentos special sections ──────────────────────────────────

  it('card-7-meta exists', () => {
    expect(el.querySelector(sel('card-7-meta'))).toBeTruthy();
  });

  it('card-7-meta mentions Perú', () => {
    expect(el.querySelector(sel('card-7-meta'))?.textContent).toContain('Perú');
  });

  it('card-7-beachhead exists', () => {
    expect(el.querySelector(sel('card-7-beachhead'))).toBeTruthy();
  });

  it('card-7-beachhead contains seg-beachhead badge with text BEACHHEAD', () => {
    expect(el.querySelector(sel('card-7-beachhead'))?.querySelector('.seg-beachhead')?.textContent?.trim())
      .toBe('BEACHHEAD');
  });

  it('card-7-beachhead-list exists and has items', () => {
    const list = el.querySelector(sel('card-7-beachhead-list'));
    expect(list).toBeTruthy();
    expect(list?.querySelectorAll('li').length).toBeGreaterThan(0);
  });

  it('card-7-tier-2 contains seg-growth badge with text FASE 2', () => {
    expect(el.querySelector(sel('card-7-tier-2'))?.querySelector('.seg-growth')?.textContent?.trim())
      .toBe('FASE 2');
  });

  it('card-7-tier-3 contains seg-established badge with text FASE 3', () => {
    expect(el.querySelector(sel('card-7-tier-3'))?.querySelector('.seg-established')?.textContent?.trim())
      .toBe('FASE 3');
  });

  // ── Card 8 — Estructura de Costos ────────────────────────────────────────

  it('card-8-list contains cost-fixed badges', () => {
    expect(el.querySelector(sel('card-8-list'))?.querySelectorAll('.cost-fixed').length)
      .toBeGreaterThanOrEqual(3);
  });

  it('card-8-list contains cost-var badges', () => {
    expect(el.querySelector(sel('card-8-list'))?.querySelectorAll('.cost-var').length)
      .toBeGreaterThanOrEqual(3);
  });

  it('card-8-viability exists', () => {
    expect(el.querySelector(sel('card-8-viability'))).toBeTruthy();
  });

  it('card-8-viability mentions Viabilidad', () => {
    expect(el.querySelector(sel('card-8-viability'))?.textContent).toContain('Viabilidad');
  });

  // ── Card 9 — Fuentes de Ingreso ───────────────────────────────────────────

  it('card-9-list contains revenue-main badges', () => {
    expect(el.querySelector(sel('card-9-list'))?.querySelectorAll('.revenue-main').length)
      .toBeGreaterThanOrEqual(2);
  });

  it('card-9-list contains revenue-sec badges', () => {
    expect(el.querySelector(sel('card-9-list'))?.querySelectorAll('.revenue-sec').length)
      .toBeGreaterThanOrEqual(2);
  });

  it('card-9-list contains revenue-future badges', () => {
    expect(el.querySelector(sel('card-9-list'))?.querySelectorAll('.revenue-future').length)
      .toBeGreaterThanOrEqual(2);
  });

  it('card-9-viability exists', () => {
    expect(el.querySelector(sel('card-9-viability'))).toBeTruthy();
  });

  it('card-9-viability mentions Odoo', () => {
    expect(el.querySelector(sel('card-9-viability'))?.textContent).toContain('Odoo');
  });

  // ── Card 2 — Actividades Clave fase badges ────────────────────────────────

  it('card-2-list has fase1 badges', () => {
    expect(el.querySelector(sel('card-2-list'))?.querySelectorAll('.fase1').length)
      .toBeGreaterThanOrEqual(3);
  });

  it('card-2-list has fase2 badges', () => {
    expect(el.querySelector(sel('card-2-list'))?.querySelectorAll('.fase2').length)
      .toBeGreaterThanOrEqual(3);
  });

  // ── Card 6 — Canales canal badges ─────────────────────────────────────────

  it('card-6-list has canal1 badge with text CANAL #1', () => {
    expect(el.querySelector(sel('card-6-list'))?.querySelector('.canal1')?.textContent?.trim())
      .toBe('CANAL #1');
  });

  it('card-6-list has canal2 badge with text CANAL #2', () => {
    expect(el.querySelector(sel('card-6-list'))?.querySelector('.canal2')?.textContent?.trim())
      .toBe('CANAL #2');
  });

  it('card-6-list has canal3 badge with text CANAL #3', () => {
    expect(el.querySelector(sel('card-6-list'))?.querySelector('.canal3')?.textContent?.trim())
      .toBe('CANAL #3');
  });

  // ── Highlight classes presence ────────────────────────────────────────────

  it('at least one .hl element exists', () => {
    expect(el.querySelectorAll('.hl').length).toBeGreaterThan(0);
  });

  it('at least one .hl-ai element exists', () => {
    expect(el.querySelectorAll('.hl-ai').length).toBeGreaterThan(0);
  });
});
