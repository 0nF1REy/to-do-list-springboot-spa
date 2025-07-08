import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Omit<Task, 'id' | 'realizado'> = {
    nome: '',
    descricao: '',
    prioridade: 3,
  };

  isEditing = false;
  private currentEditingTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.isEditing && this.currentEditingTask) {
      const updatedTask: Task = {
        id: this.currentEditingTask.id,
        realizado: this.currentEditingTask.realizado,
        ...this.newTask,
      };
      this.taskService.updateTask(updatedTask).subscribe((updatedTasks) => {
        this.tasks = updatedTasks;
        this.resetForm(form);
      });
    } else {
      this.taskService.createTask(this.newTask).subscribe((updatedTasks) => {
        this.tasks = updatedTasks;
        this.resetForm(form);
      });
    }
  }

  editTask(task: Task): void {
    this.isEditing = true;
    this.currentEditingTask = task;

    this.newTask = {
      nome: task.nome,
      descricao: task.descricao,
      prioridade: task.prioridade,
    };

    document
      .querySelector('.card-vintage')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  cancelEdit(form: NgForm): void {
    this.resetForm(form);
  }

  toggleTaskStatus(task: Task): void {
    const updatedTask = { ...task, realizado: !task.realizado };
    this.taskService.updateTask(updatedTask).subscribe((updatedTasks) => {
      this.tasks = updatedTasks;
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe((updatedTasks) => {
      this.tasks = updatedTasks;
    });
  }

  private resetForm(form: NgForm): void {
    this.isEditing = false;
    this.currentEditingTask = null;
    form.resetForm({ nome: '', descricao: '', prioridade: 3 });
  }
}
