import { Component, OnInit, Input } from '@angular/core';
import { Task } from "../task";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {TaskService} from "../task.service";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() task?: Task;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private location: Location) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  updateTask(id: number, status: string, description: string): void {
    let newTask = {id: id, status: status, description: description};
    this.taskService.updateTask(newTask).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  /*save(): void {
    if (this.task) {
      this.taskService.updateTask(this.task)
        .subscribe(() => this.goBack());
    }
  }*/
}
