import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, MatButtonModule],
})
export class TaskDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public task: Task) {}

  getPriorityText(priority: number): string {
    switch (priority) {
      case 1:
        return 'Alta';
      case 2:
        return 'Média';
      case 3:
        return 'Baixa';
      default:
        return 'Não definida';
    }
  }
}
