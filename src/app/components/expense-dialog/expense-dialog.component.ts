import {Component, Inject, OnInit} from '@angular/core';
import { OrganizerService } from '../../services/organizerService/organizer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'edit-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss']
})
export class ExpenseDialogComponent implements OnInit {
  expenseData: any;
  operation: string;
  formExpense: any;

  constructor(public dialogRef: MatDialogRef<ExpenseDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private tasksService: OrganizerService) { }

  ngOnInit() {

    this.operation = this.data.operation;
    this.expenseData = Object.assign({}, this.data.expense);

    this.formExpense = new FormGroup({
      expenseName: new FormControl(this.expenseData.name, Validators.minLength(2)),
      expenseTotalPaid: new FormControl(this.expenseData.totalPaid, Validators.minLength(2)),
      expenseProvider: new FormControl(this.expenseData.provider, Validators.minLength(2)),
      expenseCategory: new FormControl(this.expenseData.category, Validators.minLength(2)),
      expenseDate: new FormControl(this.expenseData.date, Validators.required),
    });
  }


  saveExpense () {

    this.expenseData = {
      totalPaid: Number(this.formExpense.value.expenseTotalPaid),
      provider: this.formExpense.value.expenseProvider,
      name: this.formExpense.value.expenseName,
      category: this.formExpense.value.expenseCategory,
      date: this.formExpense.value.expenseDate,
      _id: this.data.expense._id
    };

    const url = 'http://localhost:3000/money';

    this.tasksService.editExpense(this.expenseData, url)
      .subscribe(result => {
        this.dialogRef.close("success");
      });
  }

  addExpense () {
    const url = 'http://localhost:3000/money';

    // @ts-ignore
    this.expenseData = {
      totalPaid: Number(this.formExpense.value.expenseTotalPaid),
      provider: this.formExpense.value.expenseProvider,
      name: this.formExpense.value.expenseName,
      category: this.formExpense.value.expenseCategory,
      date: this.formExpense.value.expenseDate,
    };

    this.tasksService.addExpense(url, this.expenseData).subscribe(result => {
      this.dialogRef.close('success');
    });

  }


}
