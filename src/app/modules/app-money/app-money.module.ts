import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AppMoneyComponent} from './app-money/app-money.component';
import {NgMaterialModule} from '../ng-material/ng-material.module';
import { EditExpenseDialogComponent } from '../../components/edit-expense-dialog/edit-expense-dialog.component';

@NgModule({
  declarations: [
    AppMoneyComponent,
    EditExpenseDialogComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [EditExpenseDialogComponent],
})
export class AppMoneyModule { }
