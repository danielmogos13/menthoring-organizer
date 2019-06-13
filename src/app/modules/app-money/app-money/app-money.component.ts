import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TasksService} from '../../../services/tasksService/tasks.service';
import {MatDialog} from '@angular/material';
import {EditExpenseDialogComponent} from '../../../components/edit-expense-dialog/edit-expense-dialog.component';

@Component({
  selector: 'app-money',
  templateUrl: './app-money.component.html',
  styleUrls: ['./app-money.component.scss']
})
export class AppMoneyComponent implements OnInit {
  expenses: any = [];

  constructor(private http: HttpClient, private tasksService: TasksService, private dialog: MatDialog) { }

  ngOnInit() {

    const url = 'http://localhost:3000/money';
    let day = new Date();

    this.tasksService.getDayMoney(url, day).subscribe(response => {

      // @ts-ignore
      this.expenses = this.expenses.concat(response.data);
    });
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

      for(var index = 0; index <  this.expenses.length; index++){
        const currentExpenseId =  this.expenses[index].id;

        if(currentExpenseId === result.data.id){
          this.expenses[index] = result.data;
        }
      }

    });

  }

  deleteExpense (expenseId) {

  }



}
