import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppTasksComponent} from './app-tasks/app-tasks.component';
import {AppTaskDayViewComponent} from './app-tasks/app-task-day-view/app-task-day-view.component';
import {AppTaskWeekViewComponent} from './app-tasks/app-task-week-view/app-task-week-view.component';
import {TasksListComponent} from '../../components/tasks-list/tasks-list.component';
import {TasksDialogComponent} from '../../components/tasks-dialog/tasks-dialog.component';
import {CommonCustomModulesModule} from '../app-common/commonCustomModules.module';


@NgModule({
  declarations: [
    AppTasksComponent,
    AppTaskDayViewComponent,
    AppTaskWeekViewComponent,
    TasksListComponent,
    TasksDialogComponent,
  ],
  imports: [
    CommonModule,
    CommonCustomModulesModule
  ],
  entryComponents: [TasksDialogComponent],
})
export class AppTasksModule {
}
