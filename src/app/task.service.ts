import { Injectable } from '@angular/core';
import {Task} from "./task";
import {TASKS} from "./mock-tasks";
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksURL = 'https://mytasks-nova.azurewebsites.net/tasks';  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** Get all tasks */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksURL)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  /** Get task by id */
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksURL}/${id}`;
    return this.http.get<Task>(url)
      .pipe(
        tap(_ => this.log('fetched task')),
        catchError(this.handleError<Task>('getTask'))
      );
  }

  /** GET hero by status.*/
  getTaskByStatus(status: string): Observable<Task> {
    const url = `${this.tasksURL}/status/${status}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task status=${status}`)),
      catchError(this.handleError<Task>(`getTask status=${status}`))
    );
  }

  /** POST: add a new task to the server */
  addTask(status: string, description: string): Observable<string> {
    const url = `${this.tasksURL}?status=${status}&description=${description}`;
    return this.http.post<string>(url, this.httpOptions).pipe(
      tap((resp: string) => this.log(resp)),
      catchError(this.handleError<string>('addTask'))
    );
  }

  /** PUT: update task on the server */
  updateTask(task: Task): Observable<any> {
    const url = `${this.tasksURL}/${task.id}`
    return this.http.put(url, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  //TODO: update por status y por descripcion

  /** DELETE: delete the hero from the server */
  deleteTask(id: number): Observable<string> {
    const url = `${this.tasksURL}/${id}`;

    return this.http.delete<string>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<string>('deleteTask'))
    );
  }

  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
