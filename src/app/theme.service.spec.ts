import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light');
  });

  // ── Initialization from localStorage ──────────────────────────────────────

  it('defaults to dark mode when no saved preference', () => {
    expect(new ThemeService().darkMode()).toBe(true);
  });

  it('restores dark preference from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    expect(new ThemeService().darkMode()).toBe(true);
  });

  it('restores light preference from localStorage', () => {
    localStorage.setItem('theme', 'light');
    expect(new ThemeService().darkMode()).toBe(false);
  });

  // ── CSS class on <html> ────────────────────────────────────────────────────

  it('adds html.light class when restoring light preference', () => {
    localStorage.setItem('theme', 'light');
    new ThemeService();
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('removes html.light class when restoring dark preference', () => {
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'dark');
    new ThemeService();
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  // ── toggle() ──────────────────────────────────────────────────────────────

  describe('toggle()', () => {
    let service: ThemeService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);
    });

    it('switches dark to light', () => {
      expect(service.darkMode()).toBe(true);
      service.toggle();
      expect(service.darkMode()).toBe(false);
    });

    it('switches light back to dark', () => {
      service.toggle();
      service.toggle();
      expect(service.darkMode()).toBe(true);
    });

    it('adds html.light class on toggle to light', () => {
      service.toggle();
      expect(document.documentElement.classList.contains('light')).toBe(true);
    });

    it('removes html.light class on toggle back to dark', () => {
      service.toggle();
      service.toggle();
      expect(document.documentElement.classList.contains('light')).toBe(false);
    });

    it('persists light preference to localStorage', () => {
      service.toggle();
      expect(localStorage.getItem('theme')).toBe('light');
    });

    it('persists dark preference to localStorage', () => {
      service.toggle();
      service.toggle();
      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });
});
