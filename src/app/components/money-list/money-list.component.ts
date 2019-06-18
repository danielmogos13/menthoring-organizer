import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ExpenseDialogComponent} from '../expense-dialog/expense-dialog.component';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {HttpClient} from '@angular/common/http';
import {OrganizerService} from '../../services/organizerService/organizer.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActionPerformedComponent} from '../action-performed/action-performed.component';

@Component({
  selector: 'money-list',
  templateUrl: './money-list.component.html',
  styleUrls: ['./money-list.component.scss']
})
export class MoneyListComponent implements OnInit {
  @Input() classProperty;
  @Input() expenses;
  @Output() afterChange = new EventEmitter();

  constructor(private http: HttpClient, private tasksService: OrganizerService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  editExpense (expense) {

    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '450px',
      data: {
        operation: 'edit',
        expense: expense
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.afterChange.emit();
      this.openSnackBar("Expense edited");
    });
  }

  deleteExpense (expenseId) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: {
        type: 'deleteExpense',
        title: 'Delete expense',
        expenseId: expenseId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.afterChange.emit();
      this.openSnackBar("Expense deleted");
    });
  }

  openSnackBar(text) {
    this._snackBar.openFromComponent(ActionPerformedComponent, {
      data: { message: text },
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}
