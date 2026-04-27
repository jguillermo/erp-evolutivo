import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  template: `
    <li class="text-xs leading-[1.45] py-[3px] pl-[12px] relative text-ink-muted
               before:content-['▸'] before:absolute before:left-0 before:text-2xs before:text-ink-subtle
               print:text-print-xs print:leading-[1.35] print:py-[1.5px] print:pl-[10px]
               print:before:text-print-2xs">
      <ng-content />
    </li>
  `,
})
export class ListItemComponent {}
