import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskListComponent} from "./task-list/task-list.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import {TaskDetailComponent} from "./task-detail/task-detail.component";

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: TaskDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
