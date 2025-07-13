import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [TaskListComponent, TaskFormComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('cascadeIn', [
      transition(':enter', [
        query(
          '.vintage-title, .vintage-grid > section',
          [style({ opacity: 0, transform: 'translateY(40px)' })],
          { optional: true }
        ),
        query(
          '.vintage-title, .vintage-grid > section',
          stagger('300ms', [
            animate(
              '0.7s ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
          { optional: true }
        ),
      ]),
      transition(':leave', [animate('0.4s ease-in', style({ opacity: 0 }))]),
    ]),
  ],
  host: {
    '[@cascadeIn]': '',
  },
})
export class HomeComponent {}
