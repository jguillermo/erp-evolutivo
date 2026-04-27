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
const cardSource      = readFileSync(join(__dir, '../../shared/components/card/card.component.ts'), 'utf-8');
const badgeLabelSource = readFileSync(join(__dir, '../../shared/components/badge-label/badge-label.component.ts'), 'utf-8');
const comparisonSource = readFileSync(join(__dir, '../../shared/components/comparison-row/comparison-row.component.ts'), 'utf-8');

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

  it('card inner div has border and border-line classes', () => {
    const inner = el.querySelector('[data-testid="card-1"] div') as HTMLElement;
    expect(inner.classList.contains('border')).toBe(true);
    expect(inner.classList.contains('border-line')).toBe(true);
  });

  it('card question has text-ink-subtle class', () => {
    const q = el.querySelector('[data-testid="card-1-question"]') as HTMLElement;
    expect(q).toBeTruthy();
    expect(q.className).toContain('text-ink-subtle');
  });

  it('card question has border-line class', () => {
    const q = el.querySelector('[data-testid="card-1-question"]') as HTMLElement;
    expect(q.className).toContain('border-line');
  });

  // ── Highlight utilities (defined in styles.css via @apply) ───────────────

  it('.hl uses text-ai-300 token in styles.css', () => {
    expect(globalCss).toContain('text-ai-300');
  });

  it('.hl2 uses text-accent-400 token in styles.css', () => {
    expect(globalCss).toContain('text-accent-400');
  });

  it('.hl3 uses text-green-400 token in styles.css', () => {
    expect(globalCss).toContain('text-green-400');
  });

  it('.hl-ai uses text-pink-300 token in styles.css', () => {
    expect(globalCss).toContain('text-pink-300');
  });

  it('.hl utilities use font-semibold via @apply in styles.css', () => {
    const hlSection = globalCss.slice(globalCss.indexOf('.hl '), globalCss.indexOf('/* ===== List'));
    expect(hlSection.match(/font-semibold/g)?.length).toBeGreaterThanOrEqual(4);
  });

  // ── List item colors (Tailwind tokens in ListItemComponent) ──────────────

  it('list-item text uses text-ink-muted token', () => {
    expect(listItemSource).toContain('text-ink-muted');
  });

  it('list-item bullet uses text-ink-subtle token', () => {
    expect(listItemSource).toContain('before:text-ink-subtle');
  });

  // ── Section variant colors (semantic tokens in SectionComponent) ──────────

  it('note variant uses white/[3%] for background', () => {
    expect(sectionSource).toContain('white/[3%]');
  });

  it('note variant uses gray-600 for border', () => {
    expect(sectionSource).toContain('gray-600');
  });

  it('info variant uses accent-500/[6%] for background', () => {
    expect(sectionSource).toContain('accent-500/[6%]');
  });

  it('callout variant uses ai-500/[8%] for background', () => {
    expect(sectionSource).toContain('ai-500/[8%]');
  });

  it('callout variant uses ai-500/20 for border', () => {
    expect(sectionSource).toContain('ai-500/20');
  });

  it('callout variant title uses text-ai-400', () => {
    expect(sectionSource).toContain('text-ai-400');
  });

  it('highlight variant uses warning-600/[7%] for background', () => {
    expect(sectionSource).toContain('warning-600/[7%]');
  });

  it('highlight variant uses warning-600/40 for border', () => {
    expect(sectionSource).toContain('warning-600/40');
  });

  it('highlight variant title uses text-warning-100', () => {
    expect(sectionSource).toContain('text-warning-100');
  });

  // ── Canvas inline colors (token names in canvas.component.html) ──────────

  it('quoted-text component (value-statement) uses accent-400 border', () => {
    expect(comparisonSource).toContain('text-slate-200');
  });

  it('beachhead badge-label title uses text-warning-100', () => {
    expect(badgeLabelSource).toContain('text-warning-100');
  });

  it('entry-module-main uses text-white', () => {
    expect(templateHtml).toContain('text-white');
  });

  it('vs-label uses text-ink-muted in canvas template', () => {
    expect(templateHtml).toContain('text-ink-muted');
  });

  it('segment tier desc uses text-gray-400 in badge-label source', () => {
    expect(badgeLabelSource).toContain('text-gray-400');
  });

  it('segment-meta uses text-warning-400 in canvas template', () => {
    expect(templateHtml).toContain('text-warning-400');
  });

  it('segment-meta background uses warning-400/[8%] in canvas template', () => {
    expect(templateHtml).toContain('bg-warning-400/[8%]');
  });

  it('beachhead desc uses text-warning-200 in canvas template', () => {
    expect(templateHtml).toContain('text-warning-200');
  });

  it('game-text uses text-ink-muted in canvas template', () => {
    expect(templateHtml).toContain('text-ink-muted');
  });

  // ── Card bar gradient colors (semantic tokens via DOM) ───────────────────

  const barTokens: [string, number, string, string][] = [
    ['Socios Clave',         1, 'from-ai-500',      'to-ai-600'      ],
    ['Actividades Clave',    2, 'from-primary-500',  'to-primary-600' ],
    ['Recursos Clave',       3, 'from-info-500',     'to-info-600'    ],
    ['Propuesta de Valor',   4, 'from-accent-500',   'to-accent-600'  ],
    ['Relación Clientes',    5, 'from-success-500',  'to-success-600' ],
    ['Canales',              6, 'from-teal-500',     'to-teal-600'    ],
    ['Segmentos',            7, 'from-warning-500',  'to-warning-600' ],
    ['Estructura de Costos', 8, 'from-danger-500',   'to-danger-600'  ],
    ['Fuentes de Ingreso',   9, 'from-green-500',    'to-green-600'   ],
  ];

  barTokens.forEach(([name, n, from, to]) => {
    it(`${name} — card-${n}-bar has ${from} class`, () => {
      const bar = el.querySelector(`[data-testid="card-${n}-bar"]`) as HTMLElement;
      expect(bar).toBeTruthy();
      expect(bar.className).toContain(from);
    });

    it(`${name} — card-${n}-bar has ${to} class`, () => {
      const bar = el.querySelector(`[data-testid="card-${n}-bar"]`) as HTMLElement;
      expect(bar.className).toContain(to);
    });
  });

  // ── Card title colors (semantic tokens via DOM) ───────────────────────────

  const titleTokens: [string, number, string][] = [
    ['Socios Clave',         1, 'text-ai-400'      ],
    ['Actividades Clave',    2, 'text-primary-400'  ],
    ['Recursos Clave',       3, 'text-info-400'     ],
    ['Propuesta de Valor',   4, 'text-accent-400'   ],
    ['Relación Clientes',    5, 'text-success-400'  ],
    ['Canales',              6, 'text-teal-400'     ],
    ['Segmentos',            7, 'text-warning-400'  ],
    ['Estructura de Costos', 8, 'text-danger-400'   ],
    ['Fuentes de Ingreso',   9, 'text-green-400'    ],
  ];

  titleTokens.forEach(([name, n, token]) => {
    it(`${name} — card-${n}-title has ${token} class`, () => {
      const title = el.querySelector(`[data-testid="card-${n}-title"]`) as HTMLElement;
      expect(title).toBeTruthy();
      expect(title.className).toContain(token);
    });
  });
});
