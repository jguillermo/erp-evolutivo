import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipComponent, TooltipPosition, TOOLTIP_POSITIONS } from './tooltip.component';

describe('TooltipComponent', () => {
  let fixture: ComponentFixture<TooltipComponent>;
  let host: HTMLElement;
  let tooltip: HTMLElement;

  function setup(text: string, position: TooltipPosition = 'top', testId?: string) {
    fixture = TestBed.createComponent(TooltipComponent);
    fixture.componentRef.setInput('text', text);
    fixture.componentRef.setInput('position', position);
    if (testId) fixture.componentRef.setInput('testId', testId);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
    tooltip = host.querySelector('[role="tooltip"]')!;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TooltipComponent] }).compileComponents();
  });

  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders a tooltip element with role="tooltip"', () => {
    setup('Tooltip text');
    expect(tooltip).toBeTruthy();
  });

  it('displays the text content', () => {
    setup('Hello there');
    expect(tooltip.textContent?.trim()).toBe('Hello there');
  });

  // ── Host classes ──────────────────────────────────────────────────────────

  it('host has relative class', () => {
    setup('text');
    expect(host.className).toContain('relative');
  });

  it('host has inline-block class', () => {
    setup('text');
    expect(host.className).toContain('inline-block');
  });

  it('host has group class for CSS hover chaining', () => {
    setup('text');
    expect(host.className).toContain('group');
  });

  // ── Tooltip base classes ──────────────────────────────────────────────────

  it('has absolute class',              () => { setup('t'); expect(tooltip.className).toContain('absolute'); });
  it('has z-50 class',                  () => { setup('t'); expect(tooltip.className).toContain('z-50'); });
  it('has opacity-0 class',             () => { setup('t'); expect(tooltip.className).toContain('opacity-0'); });
  it('has pointer-events-none class',   () => { setup('t'); expect(tooltip.className).toContain('pointer-events-none'); });
  it('has transition-opacity class',    () => { setup('t'); expect(tooltip.className).toContain('transition-opacity'); });
  it('has group-hover:opacity-100',     () => { setup('t'); expect(tooltip.className).toContain('group-hover:opacity-100'); });
  it('has group-focus-within:opacity-100', () => { setup('t'); expect(tooltip.className).toContain('group-focus-within:opacity-100'); });
  it('has whitespace-nowrap class',     () => { setup('t'); expect(tooltip.className).toContain('whitespace-nowrap'); });
  it('has print:hidden class',          () => { setup('t'); expect(tooltip.className).toContain('print:hidden'); });
  it('has bg-[#1a1d27] class',          () => { setup('t'); expect(tooltip.className).toContain('bg-[#1a1d27]'); });
  it('has border class',                () => { setup('t'); expect(tooltip.className).toContain('border'); });
  it('has rounded-[4px] class',         () => { setup('t'); expect(tooltip.className).toContain('rounded-[4px]'); });

  // ── Position classes ──────────────────────────────────────────────────────

  (['top', 'bottom', 'left', 'right'] as TooltipPosition[]).forEach(position => {
    it(`position "${position}" applies all its classes`, () => {
      setup('text', position);
      TOOLTIP_POSITIONS[position].split(/\s+/).filter(Boolean).forEach(cls => {
        expect(tooltip.className).toContain(cls);
      });
    });
  });

  it('defaults to top position', () => {
    setup('text');
    TOOLTIP_POSITIONS['top'].split(/\s+/).filter(Boolean).forEach(cls => {
      expect(tooltip.className).toContain(cls);
    });
  });

  // ── data-testid ───────────────────────────────────────────────────────────

  it('sets data-testid on host when testId is provided', () => {
    setup('text', 'top', 'my-tooltip');
    expect(host.getAttribute('data-testid')).toBe('my-tooltip');
  });

  it('does not set data-testid when testId is not provided', () => {
    setup('text');
    expect(host.getAttribute('data-testid')).toBeNull();
  });

  it('tooltip div has id "{testId}-tooltip" when testId is provided', () => {
    setup('text', 'top', 'my-tooltip');
    expect(tooltip.getAttribute('id')).toBe('my-tooltip-tooltip');
  });

  it('tooltip div has no id when testId is not provided', () => {
    setup('text');
    expect(tooltip.getAttribute('id')).toBeNull();
  });
});
