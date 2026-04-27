import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  template: `
    <li class="text-[0.74rem] leading-[1.45] py-[3px] pl-[12px] relative text-[#b0b3c0]
               before:content-['▸'] before:absolute before:left-0 before:text-[0.65rem] before:text-[#666]
               print:text-[7.5px] print:leading-[1.35] print:py-[1.5px] print:pl-[10px]
               print:before:text-[6px]">
      <ng-content />
    </li>
  `,
})
export class ListItemComponent {}
