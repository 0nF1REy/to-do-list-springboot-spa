import {
  trigger,
  style,
  transition,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  animations: [
    trigger('cascadeAnimation', [
      transition(':enter', [
        query(
          'h1, h2, p, a',
          style({ opacity: 0, transform: 'translateY(30px)' }),
          { optional: true }
        ),
        query(
          'h1, h2, p, a',
          stagger('150ms', [
            animate(
              '0.6s ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
          { optional: true }
        ),
      ]),
      transition(':leave', [animate('400ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class NotFoundComponent {}
