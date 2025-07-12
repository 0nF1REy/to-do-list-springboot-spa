import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { TaskListComponent } from '../components/task-list/task-list.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';

@Component({
  selector: 'home',
  imports: [TaskListComponent, TaskFormComponent,  MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
