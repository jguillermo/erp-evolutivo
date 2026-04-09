import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

interface NavTab {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tabs: NavTab[] = [
    { label: 'Canvas', route: '/canvas', icon: '📋' },
    { label: 'Árbol Evolutivo', route: '/tree', icon: '🌳' },
    { label: 'IA Asesora', route: '/ai', icon: '🧠' },
    { label: 'Triggers', route: '/triggers', icon: '⚡' },
    { label: 'Precios', route: '/pricing', icon: '💰' },
  ];
}
