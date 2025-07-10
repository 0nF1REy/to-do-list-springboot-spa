import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit, OnDestroy {
  isEditing = false;
  newTask: Omit<Task, 'id' | 'realizado'> = {
    nome: '',
    descricao: '',
    prioridade: 3,
  };

  private currentEditingTask: Task | null = null;
  
  private editSubscription!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.editSubscription = this.taskService.taskToEdit$.subscribe((task) => {
      if (task) {
        this.isEditing = true;
        this.currentEditingTask = task;
        this.newTask = {
          nome: task.nome,
          descricao: task.descricao,
          prioridade: task.prioridade,
        };
      }
    });
  }

  ngOnDestroy(): void {
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    if (this.isEditing && this.currentEditingTask) {
      const updatedTask: Task = {
        id: this.currentEditingTask.id,
        realizado: this.currentEditingTask.realizado,
        ...this.newTask,
      };
      this.taskService.updateTask(updatedTask).subscribe(() => {
        this.resetForm(form);
      });
    } else {
      this.taskService.createTask(this.newTask).subscribe(() => {
        this.resetForm(form);
      });
    }
  }

  cancelEdit(form: NgForm): void {
    this.resetForm(form);
  }

  private resetForm(form: NgForm): void {
    this.isEditing = false;
    this.currentEditingTask = null;
    form.resetForm({
      nome: '',
      descricao: '',
      prioridade: 3,
    });
  }
}
