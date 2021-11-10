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
}
