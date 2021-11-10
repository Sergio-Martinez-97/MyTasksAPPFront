import { Component, OnInit } from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";
import {MessageService} from "../message.service";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  add(description: string): void {
    description = description.trim();
    if (!description) { return; }
    this.taskService.addTask({ description } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskService.deleteTask(task.id).subscribe();
  }
}
