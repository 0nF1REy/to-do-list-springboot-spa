import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // URL da API
  private apiUrl = 'http://localhost:8080/todos';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Criação
  createTask(task: Omit<Task, 'id' | 'realizado'>): Observable<Task[]> {
    const newTask = { ...task, realizado: false };
    return this.http.post<Task[]>(this.apiUrl, newTask);
  }

  // Atualização
  updateTask(task: Task): Observable<Task[]> {
    return this.http.put<Task[]>(this.apiUrl, task);
  }

  // Exclusão
  deleteTask(id: number): Observable<Task[]> {
    return this.http.delete<Task[]>(`${this.apiUrl}/${id}`);
  }
}
