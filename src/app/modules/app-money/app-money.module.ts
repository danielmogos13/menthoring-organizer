import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMoneyComponent } from './app-money.component';
import { EditExpenseDialogComponent } from '../../components/edit-expense-dialog/edit-expense-dialog.component';
import { MoneyListComponent } from '../../components/money-list/money-list.component';
import { AppMoneyDayViewComponent } from './app-money-day-view/app-money-day-view.component';
import { AppMoneyWeekviewComponent } from './app-money-weekview/app-money-weekview.component';
import { CommonCustomModulesModule } from '../app-common/commonCustomModules.module';

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
    CommonCustomModulesModule,
  ],
  entryComponents: [EditExpenseDialogComponent],
})
export class AppMoneyModule { }
