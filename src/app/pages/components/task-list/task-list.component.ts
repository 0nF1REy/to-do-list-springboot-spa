import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Task } from '../../../models/task.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDetailsDialogComponent } from '../task-details-dialog/task-details-dialog.component';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'task-list',
  standalone: true,

  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private taskUpdateSubscription!: Subscription;

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();

    this.taskUpdateSubscription = this.taskService.taskListUpdated$.subscribe(
      () => {
        this.loadTasks();
      }
    );
  }

  ngOnDestroy(): void {
    this.taskUpdateSubscription.unsubscribe();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  toggleTaskStatus(task: Task): void {
    const updatedTask = { ...task, realizado: !task.realizado };
    this.taskService.updateTask(updatedTask).subscribe();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe();
  }

  editTask(task: Task): void {
    this.taskService.selectTaskForEdit(task);
    document
      .querySelector('.card-vintage')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  openTaskDetails(task: Task): void {
    this.dialog.open(TaskDetailsDialogComponent, {
      data: task,
      width: '600px',
    });
  }
}
