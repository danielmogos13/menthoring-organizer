import {Component, Inject, OnInit} from '@angular/core';
import { TasksService } from '../../services/tasksService/tasks.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'edit-expense-dialog',
  templateUrl: './edit-expense-dialog.component.html',
  styleUrls: ['./edit-expense-dialog.component.scss']
})
export class EditExpenseDialogComponent implements OnInit {
  expenseData: any;
  operation: string;
  formExpense: any;

  constructor(public dialogRef: MatDialogRef<EditExpenseDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private tasksService: TasksService) { }

  ngOnInit() {

    this.operation = this.data.operation;
    this.expenseData = Object.assign({}, this.data.expense);

    this.formExpense = new FormGroup({
      expenseName: new FormControl(this.expenseData.name, Validators.minLength(2)),
      expenseTotalPaid: new FormControl(this.expenseData.totalPaid, Validators.minLength(2)),
      expenseProvider: new FormControl(this.expenseData.provider, Validators.minLength(5)),
    });
  }

  saveExpense () {

    this.expenseData = {
      totalPaid: this.formExpense.value.expenseTotalPaid,
      provider:  this.formExpense.value.expenseProvider,
      name:  this.formExpense.value.expenseName,
      id: this.data.expense.id
    };

    const url = 'http://localhost:3000/money';

    this.tasksService.editExpense(this.expenseData, url)
      .subscribe(result => {
        this.dialogRef.close(result);
      });
  }

  addExpense () {

  }


}
