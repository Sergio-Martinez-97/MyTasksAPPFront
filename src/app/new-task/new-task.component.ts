import { Component, OnInit } from '@angular/core';
import {TaskService} from "../task.service";
import {Task} from "../task";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService,
              private location: Location) { }

  ngOnInit(): void {
  }

  addTask(status: string, description: string): void {
    description = description.trim();
    status = status.trim();
    if (!description || !status) { return; }
    this.taskService.addTask(status, description)
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
