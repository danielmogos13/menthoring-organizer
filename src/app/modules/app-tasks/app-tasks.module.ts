import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppTasksComponent} from './app-tasks.component';
import {AppTaskDayViewComponent} from './app-task-day-view/app-task-day-view.component';
import {AppTaskWeekViewComponent} from './app-task-week-view/app-task-week-view.component';
import {TasksListComponent} from '../../components/tasks-list/tasks-list.component';
import {TasksDialogComponent} from '../../components/tasks-dialog/tasks-dialog.component';
import {CommonCustomModulesModule} from '../app-common/commonCustomModules.module';
import { TasksStatsComponent } from './tasks-stats/tasks-stats.component';

@NgModule({
  declarations: [
    AppTasksComponent,
    AppTaskDayViewComponent,
    AppTaskWeekViewComponent,
    TasksListComponent,
    TasksDialogComponent,
    TasksStatsComponent
  ],
  imports: [
    CommonModule,
    CommonCustomModulesModule
  ],
  exports: [
    TasksStatsComponent
  ],
  entryComponents: [TasksDialogComponent],
})
export class AppTasksModule {
}
