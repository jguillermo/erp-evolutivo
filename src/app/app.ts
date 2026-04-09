import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './theme.service';

interface NavTab {
  label: string;
  route: string;
  icon: string;
  visible: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  theme = inject(ThemeService);

  get darkMode() { return this.theme.darkMode(); }

  toggleTheme() { this.theme.toggle(); }

  tabs: NavTab[] = [
    { label: 'Canvas',         route: '/canvas',  icon: '📋', visible: true  },
    { label: 'Árbol Evolutivo',route: '/tree',    icon: '🌳', visible: false },
    { label: 'IA Asesora',     route: '/ai',      icon: '🧠', visible: false },
    { label: 'Triggers',       route: '/triggers',icon: '⚡', visible: false },
    { label: 'Precios',        route: '/pricing', icon: '💰', visible: false },
  ];
}
