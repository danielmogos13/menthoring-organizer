import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppTasksComponent } from './modules/app-tasks/app-tasks/app-tasks.component';
import { AppMoneyComponent } from './modules/app-money/app-money/app-money.component';
import { AppTaskDayViewComponent } from './modules/app-tasks/app-tasks/app-task-day-view/app-task-day-view.component';
import { AppTaskWeekViewComponent } from './modules/app-tasks/app-tasks/app-task-week-view/app-task-week-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks/dayview',
    pathMatch: "full",
  },
  {
    path: 'tasks',
    component: AppTasksComponent,
    children: [
      {
        path: 'dayview',
        redirectTo: 'tasks/dayview',
        pathMatch: 'full',
      },
      {
        path: 'dayview',
        component: AppTaskDayViewComponent,
      },
      {
        path: 'weekview',
        redirectTo: 'tasks/weekview',
        pathMatch: 'full',
      },
      {
        path: 'weekview',
        component: AppTaskWeekViewComponent,
      }
    ]
  },
  {
    path: 'money',
    component: AppMoneyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
