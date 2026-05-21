import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { MarkdownPipe } from './markdown.pipe';

describe('MarkdownPipe', () => {
  let pipe: MarkdownPipe;
  let sanitizer: DomSanitizer;

  function render(input: string | null | undefined, variant?: 'hl' | 'hl2' | 'hl3' | 'ai'): string {
    const result = variant ? pipe.transform(input, variant) : pipe.transform(input);
    return sanitizer.sanitize(1 /* SecurityContext.HTML */, result) ?? '';
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MarkdownPipe] });
    pipe = TestBed.inject(MarkdownPipe);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('returns empty string for null', () => {
    expect(render(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(render(undefined)).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(render('')).toBe('');
  });

  it('passes through plain text untouched', () => {
    expect(render('Hola mundo')).toBe('Hola mundo');
  });

  it('renders **bold** as <strong class="hl">', () => {
    expect(render('hola **mundo** chau')).toBe('hola <strong class="hl">mundo</strong> chau');
  });

  it('accepts a different bold variant via argument', () => {
    expect(render('**texto**', 'ai')).toBe('<strong class="hl-ai">texto</strong>');
  });

  it('renders *italic* as <em>', () => {
    expect(render('hola *mundo* chau')).toBe('hola <em>mundo</em> chau');
  });

  it('does not match italic inside bold', () => {
    expect(render('**negrita y *no italica***')).toContain('<strong');
  });

  it('renders ~~strikethrough~~ as <del>', () => {
    expect(render('tachado: ~~viejo~~ nuevo')).toBe('tachado: <del>viejo</del> nuevo');
  });

  it('renders `code` as <code>', () => {
    expect(render('usa `npm install` para instalar')).toBe('usa <code>npm install</code> para instalar');
  });

  it('combines bold + strikethrough + code in same string', () => {
    const out = render('**clave:** ~~viejo~~ ahora usa `nuevo`');
    expect(out).toContain('<strong class="hl">clave:</strong>');
    expect(out).toContain('<del>viejo</del>');
    expect(out).toContain('<code>nuevo</code>');
  });

  it('escapes HTML angle brackets from raw text', () => {
    const out = render('flujo en <10 min');
    expect(out).toContain('&lt;10 min');
    expect(out).not.toContain('<10');
  });

  it('escapes ampersands', () => {
    expect(render('A & B')).toBe('A &amp; B');
  });

  it('does not let injected script tags through', () => {
    const out = render('<script>alert(1)</script>');
    expect(out).not.toContain('<script');
    expect(out).toContain('&lt;script');
  });
});
