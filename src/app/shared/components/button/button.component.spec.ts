import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent, ButtonVariant, ButtonSize, BUTTON_VARIANTS, BUTTON_SIZES } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let host: HTMLElement;
  let button: HTMLButtonElement;

  function setup(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', disabled = false) {
    fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('variant', variant);
    fixture.componentRef.setInput('size', size);
    fixture.componentRef.setInput('disabled', disabled);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
    button = host.querySelector('button')!;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ButtonComponent] }).compileComponents();
  });

  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders a <button> element', () => {
    setup();
    expect(button).toBeTruthy();
  });

  it('host has inline-block class', () => {
    setup();
    expect(host.className).toContain('inline-block');
  });

  // ── Base classes ──────────────────────────────────────────────────────────

  it('has inline-flex class',        () => { setup(); expect(button.className).toContain('inline-flex'); });
  it('has font-medium class',        () => { setup(); expect(button.className).toContain('font-medium'); });
  it('has rounded-[6px] class',      () => { setup(); expect(button.className).toContain('rounded-[6px]'); });
  it('has transition-colors class',  () => { setup(); expect(button.className).toContain('transition-colors'); });
  it('has cursor-pointer class',     () => { setup(); expect(button.className).toContain('cursor-pointer'); });
  it('has print:hidden class',       () => { setup(); expect(button.className).toContain('print:hidden'); });

  // ── Focus-visible a11y ────────────────────────────────────────────────────

  it('has focus-visible:outline-2 class',        () => { setup(); expect(button.className).toContain('focus-visible:outline-2'); });
  it('has focus-visible:outline-offset-2 class', () => { setup(); expect(button.className).toContain('focus-visible:outline-offset-2'); });
  it('has focus-visible:outline-[#6366f1]',      () => { setup(); expect(button.className).toContain('focus-visible:outline-[#6366f1]'); });

  // ── Variants ──────────────────────────────────────────────────────────────

  (['primary', 'secondary', 'ghost'] as ButtonVariant[]).forEach(variant => {
    it(`variant "${variant}" applies all its classes`, () => {
      setup(variant);
      BUTTON_VARIANTS[variant].split(/\s+/).filter(Boolean).forEach(cls => {
        expect(button.className).toContain(cls);
      });
    });
  });

  // ── Sizes ─────────────────────────────────────────────────────────────────

  (['sm', 'md', 'lg'] as ButtonSize[]).forEach(size => {
    it(`size "${size}" applies all its classes`, () => {
      setup('primary', size);
      BUTTON_SIZES[size].split(/\s+/).filter(Boolean).forEach(cls => {
        expect(button.className).toContain(cls);
      });
    });
  });

  // ── Disabled state ────────────────────────────────────────────────────────

  it('button is not disabled by default', () => {
    setup();
    expect(button.disabled).toBe(false);
  });

  it('button is disabled when disabled input is true', () => {
    setup('primary', 'md', true);
    expect(button.disabled).toBe(true);
  });

  it('has disabled:opacity-50 class', () => {
    setup();
    expect(button.className).toContain('disabled:opacity-50');
  });

  it('has disabled:cursor-not-allowed class', () => {
    setup();
    expect(button.className).toContain('disabled:cursor-not-allowed');
  });

  // ── Output ────────────────────────────────────────────────────────────────

  it('emits clicked when button is clicked', () => {
    setup();
    let emitted = false;
    fixture.componentInstance.clicked.subscribe(() => (emitted = true));
    button.click();
    expect(emitted).toBe(true);
  });

  it('does not emit clicked when disabled', () => {
    setup('primary', 'md', true);
    let emitted = false;
    fixture.componentInstance.clicked.subscribe(() => (emitted = true));
    (fixture.componentInstance as any)['handleClick']();
    expect(emitted).toBe(false);
  });

  // ── aria-label ────────────────────────────────────────────────────────────

  it('sets aria-label when ariaLabel input is provided', () => {
    fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('ariaLabel', 'Submit form');
    fixture.detectChanges();
    button = (fixture.nativeElement as HTMLElement).querySelector('button')!;
    expect(button.getAttribute('aria-label')).toBe('Submit form');
  });

  it('does not set aria-label when ariaLabel is not provided', () => {
    setup();
    expect(button.getAttribute('aria-label')).toBeNull();
  });

  // ── data-testid ───────────────────────────────────────────────────────────

  it('sets data-testid on host when testId is provided', () => {
    fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('testId', 'my-btn');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).getAttribute('data-testid')).toBe('my-btn');
  });

  it('does not set data-testid when testId is not provided', () => {
    setup();
    expect(host.getAttribute('data-testid')).toBeNull();
  });
});
