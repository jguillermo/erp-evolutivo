import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch, BRANCHES } from '../../models/branch.model';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree.component.html',
})
export class TreeComponent {
  branches: Branch[] = BRANCHES;
}
