import { Component, OnInit } from '@angular/core';
import {TasksService} from '../../../services/tasksService/tasks.service';

@Component({
  selector: 'app-money-day-view',
  templateUrl: './app-money-day-view.component.html',
  styleUrls: ['./app-money-day-view.component.scss']
})
export class AppMoneyDayViewComponent implements OnInit {
  expenses: any = [];
  isLoading: boolean = false;

  constructor( private tasksService: TasksService) { }

  ngOnInit() {

    const url = 'http://localhost:3000/money';
    let day = new Date();

    this.isLoading = true;
    this.tasksService.getDayMoney(url, day).subscribe(response => {

      this.isLoading = false;
      // @ts-ignore
      this.expenses = this.expenses.concat(response.data);
    });

  }
}
