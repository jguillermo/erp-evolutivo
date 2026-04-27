import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  template: `
    <li class="text-xs leading-[1.45] py-sm pl-xl relative text-ink-muted
               before:content-['▸'] before:absolute before:left-0 before:text-2xs before:text-ink-subtle
               print:text-print-xs print:leading-[1.35] print:py-nano print:pl-xl
               print:before:text-print-2xs">
      <ng-content />
    </li>
  `,
})
export class ListItemComponent {}
