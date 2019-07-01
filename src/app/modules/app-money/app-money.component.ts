import { Component, OnInit } from '@angular/core';
import { ExpenseDialogComponent } from '../../components/expense-dialog/expense-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActionPerformedComponent} from '../../components/action-performed/action-performed.component';

@Component({
  selector: 'app-money',
  templateUrl: './app-money.component.html',
  styleUrls: ['./app-money.component.scss']
})
export class AppMoneyComponent implements OnInit {

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  addExpense () {

    const expenseToAdd = {
      date: new Date(),
      totalPaid: 0,
      provider: "",
      category: "",
      name: ""
    };

    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '450px',
      disableClose: true,
      data: {
        operation: 'add',
        expense: expenseToAdd
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success'){
        this.openSnackBar("Expense created");
      }
    })

  }

  openSnackBar(text) {
    this._snackBar.openFromComponent(ActionPerformedComponent, {
      data: { message: text },
      duration: 5000,
      verticalPosition: 'top'
    });
  }

}
