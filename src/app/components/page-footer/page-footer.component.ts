import { trigger, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'page-footer',
  standalone: true,
  imports: [],
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.css'],
  animations: [
    trigger('slideUpAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '0.8s 1.2s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class PageFooterComponent {}
