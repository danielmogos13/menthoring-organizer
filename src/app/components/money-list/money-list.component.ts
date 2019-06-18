import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {EditExpenseDialogComponent} from '../edit-expense-dialog/edit-expense-dialog.component';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {HttpClient} from '@angular/common/http';
import {TasksService} from '../../services/tasksService/tasks.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'money-list',
  templateUrl: './money-list.component.html',
  styleUrls: ['./money-list.component.scss']
})
export class MoneyListComponent implements OnInit {
  @Input() classProperty;
  @Input() expenses;
  @Output() afterChange = new EventEmitter();

  constructor(private http: HttpClient, private tasksService: TasksService, private dialog: MatDialog) { }

  ngOnInit() {
  }


  editExpense (expense) {

    const dialogRef = this.dialog.open(EditExpenseDialogComponent, {
      width: '450px',
      data: {
        operation: 'edit',
        expense: expense
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.afterChange.emit();
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
    });

  }
}
