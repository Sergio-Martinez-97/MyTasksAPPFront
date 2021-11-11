import { Component, OnInit } from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";
import {MessageService} from "../message.service";
import { Location } from '@angular/common';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService,
              private messageService: MessageService,
              private location: Location) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  getTaskByStatus(status: string): void {
    this.taskService.getTaskByStatus(status)
      .subscribe(tasks => this.tasks = [tasks]);
  }

  delete(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe();
    this.tasks = this.tasks.filter(h => h !== task);
  }
}
