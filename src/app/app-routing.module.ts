import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppTasksComponent } from './modules/app-tasks/app-tasks/app-tasks.component';
import { AppMoneyComponent } from './modules/app-money/app-money/app-money.component';
import { AppTaskDayViewComponent } from './modules/app-tasks/app-tasks/app-task-day-view/app-task-day-view.component';
import { AppTaskWeekViewComponent } from './modules/app-tasks/app-tasks/app-task-week-view/app-task-week-view.component';
import {LoginComponent} from './modules/app-login/login/login.component';
import {AuthGuard} from './services/auth-guard/auth-guard.service';
import {LayoutComponent} from './layout/layout.component';
import { LoginGuardService } from './services/loginGuard/login-guard.service';
import {UserRole} from './services/appRoles/app-roles.service';
import {UserRegistrationComponent} from './modules/app-login/user-registration/user-registration.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuardService],
      },
      {
        path: 'registration',
        component: UserRegistrationComponent,
      },
      {
        path: '',
        redirectTo: '/app/tasks/dayview',
        pathMatch: "full"
      },
      {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        resolve:{
          role: UserRole
        },
        children: [
          {
            path: '',
            redirectTo: '/app/tasks/dayview',
            pathMatch: "full",
          },
          {
            path: 'tasks',
            component: AppTasksComponent,
            children: [
              {
                path: '',
                redirectTo: '/dayview',
                pathMatch: "full"
              },
              {
                path: 'dayview',
                component: AppTaskDayViewComponent
              },
              {
                path: 'weekview',
                component: AppTaskWeekViewComponent
              },
              {
                path: '**',
                redirectTo: '/app/tasks/dayview',
              },
            ]
          },
          {
            path: 'money',
            component: AppMoneyComponent,
            pathMatch: "full"
          },
          {
            path: '**',
            redirectTo: '/app/money',
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
