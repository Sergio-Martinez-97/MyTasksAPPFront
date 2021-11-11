import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../task.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'status', 'description', 'delete'];

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  delete(task: Task): void {
    console.log("DELETE")
    this.taskService.deleteTask(task.id).subscribe();
    this.tasks = this.tasks.filter(h => h !== task);
  }
}
