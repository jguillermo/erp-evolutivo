import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  darkMode = signal(this.loadTheme());

  toggle(): void {
    const next = !this.darkMode();
    this.darkMode.set(next);
    this.applyTheme(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  private loadTheme(): boolean {
    const isDark = localStorage.getItem('theme') !== 'light';
    this.applyTheme(isDark);
    return isDark;
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.classList.toggle('light', !isDark);
  }
}
