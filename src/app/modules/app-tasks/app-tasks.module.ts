import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from '../../app.component';
import {SideBarComponent} from '../../layout/side-bar/side-bar.component';
import {LayoutComponent} from '../../layout/layout.component';
import {AppContentComponent} from '../../layout/app-content/app-content.component';
import {AppStatsComponent} from '../../layout/side-bar/app-stats/app-stats.component';
import {AppViewsComponent} from '../../layout/app-content/app-views/app-views.component';
import {AppTasksComponent} from './app-tasks/app-tasks.component';
import {AppTimeIntervalComponent} from './app-tasks/app-time-interval/app-time-interval.component';
import {AppTaskDayViewComponent} from './app-tasks/app-task-day-view/app-task-day-view.component';
import {AppTaskWeekViewComponent} from './app-tasks/app-task-week-view/app-task-week-view.component';
import {AppListComponent} from '../../components/app-list/app-list.component';
import {TasksDialogComponent} from '../../components/tasks-dialog/tasks-dialog.component';
import {DeleteTaskDialogComponent} from '../../components/delete-task-dialog/delete-task-dialog.component';
import {ActionPerformedComponent} from '../../components/action-performed/action-performed.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {NgMaterialModule} from '../ng-material/ng-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DATE_LOCALE, MatDatepickerModule, MatNativeDateModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    LayoutComponent,
    AppContentComponent,
    AppStatsComponent,
    AppViewsComponent,
    AppTasksComponent,
    AppTimeIntervalComponent,
    AppTaskDayViewComponent,
    AppTaskWeekViewComponent,
    AppListComponent,
    TasksDialogComponent,
    DeleteTaskDialogComponent,
    ActionPerformedComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  entryComponents: [TasksDialogComponent, DeleteTaskDialogComponent, ActionPerformedComponent],
  providers: [
    AngularFireDatabaseModule,
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'ro-RO'},
  ]
})
export class AppTasksModule { }
