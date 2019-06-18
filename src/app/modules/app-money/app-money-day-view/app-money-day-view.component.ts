import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizerService} from '../../../services/organizerService/organizer.service';

@Component({
  selector: 'app-money-day-view',
  templateUrl: './app-money-day-view.component.html',
  styleUrls: ['./app-money-day-view.component.scss']
})
export class AppMoneyDayViewComponent implements OnInit, OnDestroy {
  expenses: any = [];
  isLoading: boolean = false;
  itemAddedEvent: any;

  constructor(private tasksService: OrganizerService) { }

  ngOnInit() {
    this.getExpenses();

    this.itemAddedEvent = this.tasksService.afterChange.subscribe(expenseAdded => {
      this.expenses = [];
      this.getExpenses();
    });
  }

  refreshExpenses () {
    this.expenses = [];
    this.getExpenses();
  }

  getExpenses () {

    const url = 'http://localhost:3000/money';
    let day = new Date();

    this.isLoading = true;
    this.tasksService.getDayMoney(url, day).subscribe(response => {

      this.isLoading = false;
      // @ts-ignore
      this.expenses = this.expenses.concat(response.data);
    });
  }

  ngOnDestroy () {
    if(this.itemAddedEvent) {
      this.itemAddedEvent.unsubscribe();
    }
  }
}
