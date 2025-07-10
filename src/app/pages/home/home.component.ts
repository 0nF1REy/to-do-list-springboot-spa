import { Component } from '@angular/core';

import { TaskListComponent } from '../components/task-list/task-list.component';

import { TaskFormComponent } from '../components/task-form/task-form.component';

@Component({
  selector: 'home',
  imports: [TaskListComponent, TaskFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
