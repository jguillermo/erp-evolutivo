import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  darkMode = signal(this.loadTheme());

  toggle(): void {
    this.darkMode.update(v => {
      const next = !v;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }

  private loadTheme(): boolean {
    return localStorage.getItem('theme') !== 'light';
  }
}
