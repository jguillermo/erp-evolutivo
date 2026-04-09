import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  darkMode = signal(true);

  toggle() {
    this.darkMode.update(v => !v);
  }
}
