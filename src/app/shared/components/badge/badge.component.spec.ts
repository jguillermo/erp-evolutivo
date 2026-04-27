import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent, BadgeColor, BADGE_COLORS } from './badge.component';

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<BadgeComponent>;
  let span: HTMLSpanElement;

  function setup(color: BadgeColor) {
    fixture = TestBed.createComponent(BadgeComponent);
    fixture.componentRef.setInput('testId', 'badge-test');
    fixture.componentRef.setInput('color', color);
    fixture.detectChanges();
    span = (fixture.nativeElement as HTMLElement).querySelector('span')!;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BadgeComponent] }).compileComponents();
  });

  it('renders an inner span element', () => {
    setup('indigo');
    expect(span).toBeTruthy();
  });

  it('host element has data-testid', () => {
    setup('indigo');
    expect((fixture.nativeElement as HTMLElement).getAttribute('data-testid')).toBe('badge-test');
  });

  // ── Base classes (common to all colors) ───────────────────────────────────

  it('inner span has inline-block',      () => { setup('indigo'); expect(span.className).toContain('inline-block'); });
  it('inner span has font-bold',         () => { setup('indigo'); expect(span.className).toContain('font-bold'); });
  it('inner span has tracking-[0.5px]',  () => { setup('indigo'); expect(span.className).toContain('tracking-[0.5px]'); });
  it('inner span has rounded-[3px]',     () => { setup('indigo'); expect(span.className).toContain('rounded-[3px]'); });
  it('inner span has py-nano',           () => { setup('indigo'); expect(span.className).toContain('py-nano'); });
  it('inner span has whitespace-nowrap', () => { setup('indigo'); expect(span.className).toContain('whitespace-nowrap'); });
  it('inner span has print:text-print-2xs', () => { setup('indigo'); expect(span.className).toContain('print:text-print-2xs'); });

  // ── Per-color classes ──────────────────────────────────────────────────────

  (Object.keys(BADGE_COLORS) as BadgeColor[]).forEach(color => {
    it(`color "${color}" applies all its classes`, () => {
      setup(color);
      BADGE_COLORS[color].split(/\s+/).filter(Boolean).forEach(cls => {
        expect(span.className).toContain(cls);
      });
    });
  });
});
