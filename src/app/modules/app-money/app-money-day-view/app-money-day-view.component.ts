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
  dateChangeEvent: any;
  date: any;

  constructor(private tasksService: OrganizerService) { }

  ngOnInit() {

    this.itemAddedEvent = this.tasksService.afterChange.subscribe(expenseAdded => {
      this.getExpenses(this.date);
    });


    this.dateChangeEvent = this.tasksService.currentDate.subscribe(date => {
      this.date = date;

      this.getExpenses(date);

    });
  }

  refreshExpenses () {
    this.getExpenses(this.date);
  }

  getExpenses (date) {

    this.expenses = [];
    const url = 'http://localhost:3000/money';


    this.isLoading = true;
    this.tasksService.getDayExpenses(url, date).subscribe(
      (response) => {

        this.isLoading = false;
        // @ts-ignore
        this.expenses = this.expenses.concat(response.data);
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy () {
    if(this.itemAddedEvent) {
      this.itemAddedEvent.unsubscribe();
    }

    if(this.dateChangeEvent){
      this.dateChangeEvent.unsubscribe();
    }
  }
}
