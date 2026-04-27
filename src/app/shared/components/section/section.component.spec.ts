import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionComponent, SectionVariant, SECTION_STYLES } from './section.component';

describe('SectionComponent', () => {
  let fixture: ComponentFixture<SectionComponent>;
  let host: HTMLElement;
  let container: HTMLDivElement;

  function setup(variant: SectionVariant, title = '', testId?: string) {
    fixture = TestBed.createComponent(SectionComponent);
    fixture.componentRef.setInput('variant', variant);
    fixture.componentRef.setInput('title', title);
    if (testId) fixture.componentRef.setInput('testId', testId);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
    container = host.querySelector('div')!;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SectionComponent] }).compileComponents();
  });

  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders a container div', () => {
    setup('note');
    expect(container).toBeTruthy();
  });

  it('host has block class', () => {
    setup('note');
    expect((host as HTMLElement).className).toContain('block');
  });

  // ── data-testid ───────────────────────────────────────────────────────────

  it('sets data-testid on host when testId provided', () => {
    setup('note', '', 'my-section');
    expect(host.getAttribute('data-testid')).toBe('my-section');
  });

  it('does not set data-testid when testId is not provided', () => {
    setup('note');
    expect(host.getAttribute('data-testid')).toBeNull();
  });

  // ── Per-variant container classes ─────────────────────────────────────────

  (['note', 'info', 'callout', 'highlight'] as SectionVariant[]).forEach(variant => {
    it(`variant "${variant}" applies all container classes`, () => {
      setup(variant);
      SECTION_STYLES[variant].container.split(/\s+/).filter(Boolean).forEach(cls => {
        expect(container.className).toContain(cls);
      });
    });
  });

  // ── Title slot ────────────────────────────────────────────────────────────

  it('does not render title element when title is empty', () => {
    setup('callout', '');
    expect(container.querySelector('p')).toBeNull();
  });

  it('renders title element when title is provided', () => {
    setup('callout', 'My Title');
    expect(container.querySelector('p')).toBeTruthy();
  });

  it('title element shows provided text', () => {
    setup('callout', 'Section Heading');
    expect(container.querySelector('p')?.textContent?.trim()).toBe('Section Heading');
  });

  // ── Per-variant title classes ─────────────────────────────────────────────

  (['note', 'info', 'callout', 'highlight'] as SectionVariant[]).forEach(variant => {
    it(`variant "${variant}" title applies correct classes`, () => {
      setup(variant, 'Title');
      const p = container.querySelector('p')!;
      SECTION_STYLES[variant].title.split(/\s+/).filter(Boolean).forEach(cls => {
        expect(p.className).toContain(cls);
      });
    });
  });

  // ── Title data-testid ─────────────────────────────────────────────────────

  it('title has data-testid "{testId}-title" when testId is provided', () => {
    setup('highlight', 'Title', 'sec-1');
    expect(container.querySelector('[data-testid="sec-1-title"]')).toBeTruthy();
  });

  it('title has no data-testid when testId is not provided', () => {
    setup('highlight', 'Title');
    expect(container.querySelector('p')?.getAttribute('data-testid')).toBeNull();
  });

  // ── ng-content projection ────────────────────────────────────────────────

  it('container div exists to hold projected content', () => {
    setup('info');
    expect(container).toBeTruthy();
  });
});
