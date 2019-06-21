import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMoneyComponent } from './app-money.component';
import { ExpenseDialogComponent } from '../../components/expense-dialog/expense-dialog.component';
import { MoneyListComponent } from '../../components/money-list/money-list.component';
import { AppMoneyDayViewComponent } from './app-money-day-view/app-money-day-view.component';
import { AppMoneyWeekviewComponent } from './app-money-weekview/app-money-weekview.component';
import { CommonCustomModulesModule } from '../app-common/commonCustomModules.module';
import { MoneyStatsComponent } from './money-stats/money-stats.component';
import { ExpenseSettingsComponent } from '../../components/expense-settings/expense-settings.component';

@NgModule({
  declarations: [
    AppMoneyComponent,
    MoneyListComponent,
    ExpenseDialogComponent,
    AppMoneyDayViewComponent,
    AppMoneyWeekviewComponent,
    MoneyStatsComponent,
    ExpenseSettingsComponent
  ],
  imports: [
    CommonModule,
    CommonCustomModulesModule,
  ],
  exports: [
    MoneyStatsComponent,
    ExpenseSettingsComponent
  ],
  entryComponents: [ExpenseDialogComponent, ExpenseSettingsComponent],
})
export class AppMoneyModule { }
