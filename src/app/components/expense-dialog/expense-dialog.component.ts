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
  categories: any;
  saveIsLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ExpenseDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private tasksService: OrganizerService) { }

  ngOnInit() {

    this.operation = this.data.operation;
    this.expenseData = Object.assign({}, this.data.expense);
    this.categories = JSON.parse(localStorage.getItem('currentCategories'));

    this.formExpense = new FormGroup({
      expenseName: new FormControl(this.expenseData.name, Validators.minLength(2)),
      expenseTotalPaid: new FormControl(this.expenseData.totalPaid, Validators.minLength(2)),
      expenseProvider: new FormControl(this.expenseData.provider, Validators.minLength(2)),
      expenseCategory: new FormControl(this.expenseData.category, Validators.minLength(2)),
      expenseDate: new FormControl(new Date(this.expenseData.date), Validators.required),
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
    this.saveIsLoading = true;

    this.tasksService.editExpense(this.expenseData, url)
      .subscribe(result => {
        this.saveIsLoading = false;
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

    this.saveIsLoading = true;
    this.tasksService.addExpense(url, this.expenseData).subscribe(result => {
      this.saveIsLoading = false;
      this.dialogRef.close('success');
    });

  }

}
