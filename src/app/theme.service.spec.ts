import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => localStorage.clear());

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
