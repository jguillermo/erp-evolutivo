import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent, AlertVariant, ALERT_STYLES } from './alert.component';

describe('AlertComponent', () => {
  let fixture: ComponentFixture<AlertComponent>;
  let host: HTMLElement;
  let container: HTMLElement;

  function setup(variant: AlertVariant, message = 'Test message', dismissible = false, testId?: string) {
    fixture = TestBed.createComponent(AlertComponent);
    fixture.componentRef.setInput('variant', variant);
    fixture.componentRef.setInput('message', message);
    fixture.componentRef.setInput('dismissible', dismissible);
    if (testId) fixture.componentRef.setInput('testId', testId);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
    container = host.querySelector('div')!;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AlertComponent] }).compileComponents();
  });

  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders a container div', () => {
    setup('info');
    expect(container).toBeTruthy();
  });

  it('displays the message text', () => {
    setup('info', 'Something went wrong');
    expect(host.textContent).toContain('Something went wrong');
  });

  // ── Container base classes ────────────────────────────────────────────────

  it('container has flex class',         () => { setup('info'); expect(container.className).toContain('flex'); });
  it('container has items-start class',  () => { setup('info'); expect(container.className).toContain('items-start'); });
  it('container has rounded-[6px]',      () => { setup('info'); expect(container.className).toContain('rounded-[6px]'); });
  it('container has border class',       () => { setup('info'); expect(container.className).toContain('border'); });
  it('container has text-[0.82rem]',     () => { setup('info'); expect(container.className).toContain('text-[0.82rem]'); });

  // ── ARIA ──────────────────────────────────────────────────────────────────

  it('host has role="alert" for error variant', () => {
    setup('error');
    expect(host.getAttribute('role')).toBe('alert');
  });

  it('host has role="status" for info variant', () => {
    setup('info');
    expect(host.getAttribute('role')).toBe('status');
  });

  it('host has role="status" for success variant', () => {
    setup('success');
    expect(host.getAttribute('role')).toBe('status');
  });

  it('host has role="status" for warning variant', () => {
    setup('warning');
    expect(host.getAttribute('role')).toBe('status');
  });

  it('host has aria-live="assertive" for error variant', () => {
    setup('error');
    expect(host.getAttribute('aria-live')).toBe('assertive');
  });

  it('host has aria-live="polite" for non-error variants', () => {
    setup('info');
    expect(host.getAttribute('aria-live')).toBe('polite');
  });

  // ── Per-variant styles ────────────────────────────────────────────────────

  (['info', 'success', 'warning', 'error'] as AlertVariant[]).forEach(variant => {
    it(`variant "${variant}" applies all container classes`, () => {
      setup(variant);
      ALERT_STYLES[variant].container.split(/\s+/).filter(Boolean).forEach(cls => {
        expect(container.className).toContain(cls);
      });
    });

    it(`variant "${variant}" renders its icon`, () => {
      setup(variant);
      expect(host.textContent).toContain(ALERT_STYLES[variant].icon);
    });
  });

  // ── Dismiss ───────────────────────────────────────────────────────────────

  it('does not render dismiss button when dismissible is false', () => {
    setup('info', 'msg', false);
    expect(host.querySelector('button')).toBeNull();
  });

  it('renders dismiss button when dismissible is true', () => {
    setup('info', 'msg', true);
    expect(host.querySelector('button')).toBeTruthy();
  });

  it('dismiss button has aria-label containing the variant', () => {
    setup('warning', 'msg', true);
    expect(host.querySelector('button')?.getAttribute('aria-label')).toContain('warning');
  });

  it('emits dismissed when dismiss button is clicked', () => {
    setup('info', 'msg', true);
    let emitted = false;
    fixture.componentInstance.dismissed.subscribe(() => (emitted = true));
    (host.querySelector('button') as HTMLButtonElement).click();
    expect(emitted).toBe(true);
  });

  // ── data-testid ───────────────────────────────────────────────────────────

  it('sets data-testid on host when testId is provided', () => {
    setup('info', 'msg', false, 'my-alert');
    expect(host.getAttribute('data-testid')).toBe('my-alert');
  });

  it('does not set data-testid when testId is not provided', () => {
    setup('info');
    expect(host.getAttribute('data-testid')).toBeNull();
  });
});
