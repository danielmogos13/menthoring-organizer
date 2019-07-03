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

    this.onFormChanges();
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

    this.saveIsLoading = true;

    this.tasksService.editExpense(this.expenseData)
      .subscribe(result => {
          this.saveIsLoading = false;
          this.dialogRef.close('success');
        },
        error => {
          this.saveIsLoading = false;
        });
  }

  addExpense () {

    // @ts-ignore
    this.expenseData = {
      totalPaid: Number(this.formExpense.value.expenseTotalPaid),
      provider: this.formExpense.value.expenseProvider,
      name: this.formExpense.value.expenseName,
      category: this.formExpense.value.expenseCategory,
      date: this.formExpense.value.expenseDate,
    };

    this.saveIsLoading = true;
    this.tasksService.addExpense(this.expenseData).subscribe(result => {
      this.saveIsLoading = false;
      this.dialogRef.close('success');
    });

  }

  onFormChanges () {
    this.formExpense.valueChanges.subscribe(val => {
      this.dialogRef.disableClose = true;
    });
  }

}
