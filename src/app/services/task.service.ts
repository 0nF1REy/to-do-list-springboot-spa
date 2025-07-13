import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Task } from '../models/task.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/todos';

  private taskToEditSource = new Subject<Task>();
  taskToEdit$ = this.taskToEditSource.asObservable();

  private taskListUpdatedSource = new Subject<void>();
  taskListUpdated$ = this.taskListUpdatedSource.asObservable();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  selectTaskForEdit(task: Task): void {
    this.taskToEditSource.next(task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Omit<Task, 'id' | 'realizado'>): Observable<Task[]> {
    const newTask = { ...task, realizado: false };
    return this.http.post<Task[]>(this.apiUrl, newTask).pipe(
      tap(() => {
        this.taskListUpdatedSource.next();
        this.notificationService.showSuccess('Tarefa criada com sucesso!');
      })
    );
  }

  updateTask(task: Task): Observable<Task[]> {
    return this.http.put<Task[]>(this.apiUrl, task).pipe(
      tap(() => {
        this.taskListUpdatedSource.next();
        this.notificationService.showSuccess('Tarefa atualizada com sucesso!');
      })
    );
  }

  deleteTask(id: number): Observable<Task[]> {
    return this.http.delete<Task[]>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.taskListUpdatedSource.next();
        this.notificationService.showSuccess('Tarefa excluída com sucesso!');
      })
    );
  }
}
