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
    const tasks = of(TASKS);
    return this.http.get<Task[]>(this.tasksURL)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  /** PUT: update the hero on the server */
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksURL, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** GET hero by id.*/
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksURL}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  /** POST: add a new task to the server */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksURL, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksURL}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
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
