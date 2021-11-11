import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskListComponent} from "./task-list/task-list.component";
import { NewTaskComponent } from './new-task/new-task.component';
import {TaskDetailComponent} from "./task-detail/task-detail.component";

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'create', component: NewTaskComponent },
  { path: 'detail/:id', component: TaskDetailComponent },
  { path: '', redirectTo: '/new-task', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
