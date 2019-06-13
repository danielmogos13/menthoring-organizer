import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AppMoneyComponent} from './app-money.component';
import {NgMaterialModule} from '../ng-material/ng-material.module';
import { EditExpenseDialogComponent } from '../../components/edit-expense-dialog/edit-expense-dialog.component';
import {AppTasksModule} from '../app-tasks/app-tasks.module';
import {RouterModule} from '@angular/router';
import { MoneyListComponent } from '../../components/money-list/money-list.component';
import { AppMoneyDayViewComponent } from './app-money-day-view/app-money-day-view.component';
import { AppMoneyWeekviewComponent } from './app-money-weekview/app-money-weekview.component';

@NgModule({
  declarations: [
    AppMoneyComponent,
    MoneyListComponent,
    EditExpenseDialogComponent,
    AppMoneyDayViewComponent,
    AppMoneyWeekviewComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    ReactiveFormsModule,
    AppTasksModule,
    RouterModule
  ],
  entryComponents: [EditExpenseDialogComponent],
})
export class AppMoneyModule { }
