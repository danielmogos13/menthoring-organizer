import { Component, OnInit, Input } from '@angular/core';
import {  TasksService} from '../../services/tasksService/tasks.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-time-interval',
  templateUrl: './app-time-interval.component.html',
  styleUrls: ['./app-time-interval.component.scss']
})
export class AppTimeIntervalComponent implements OnInit {
  @Input() page: string;

  activeView = "dayview";
  daysToAddOrSubtract: number;
  currentDate = new Date();
  currentDayNumber: number = this.currentDate.getDate();
  currentDayString: string = this.currentDayNumber < 10 ? "0" + this.currentDayNumber: this.currentDayNumber.toString();
  currentMonth: string = (this.currentDate.getMonth() + 1).toString();
  currentYear: number = this.currentDate.getFullYear();
  buttonRoutes: any;

  constructor(private tasksService: TasksService, private _router: Router) { }

  ngOnInit() {
    this.tasksService.updateDate(this.currentDayNumber + '/' + this.currentMonth + "/" + this.currentYear);

    this.buttonRoutes = {
      dayview: this.page === 'tasks' ? '/app/tasks/dayview': '/app/money/dayview',
      weekview: this.page === 'tasks' ? '/app/tasks/weekview': '/app/money/weekview',
    }
  }

  changeDate(type) {

    this.activeView = this._router.url === "/app/tasks/dayview" ? 'dayview': 'weekview';


    if(this.activeView === 'dayview'){
      this.daysToAddOrSubtract = 1;
    }else {
      this.daysToAddOrSubtract = 7;
    }

    if(type === "decrease"){

      this.currentDayNumber = this.currentDayNumber-this.daysToAddOrSubtract;

      if(this.currentDayNumber < 1) {

        const newDay = new Date(this.currentYear, parseInt(this.currentMonth) -1, 0).getDate();
        this.currentDayNumber = newDay - (-this.currentDayNumber) ;

        this.currentMonth = (parseInt(this.currentMonth) -1).toString();

        if(parseInt(this.currentMonth) < 1){
          const newMonth = 12;
          this.currentMonth = newMonth.toString();
          this.currentYear =  this.currentYear -1;
        }

      }

      this.currentDayString = this.currentDayNumber < 10 ? "0" + this.currentDayNumber: this.currentDayNumber.toString();
    }else {
      this.currentDayNumber = this.currentDayNumber+this.daysToAddOrSubtract;
      const maxDays = new Date(this.currentYear, parseInt(this.currentMonth), 0).getDate();

      if(this.currentDayNumber > maxDays) {

        this.currentDayNumber = this.currentDayNumber - maxDays;

        this.currentMonth = (parseInt(this.currentMonth) +1).toString();

        if(parseInt(this.currentMonth) > 12){
          const newMonth = 1;
          this.currentMonth = newMonth.toString();
          this.currentYear =  this.currentYear +1;
        }

      }

      this.currentDayString = this.currentDayNumber < 10 ? "0" + this.currentDayNumber: this.currentDayNumber.toString();
    }

    this.tasksService.updateDate(this.currentDayNumber + '/' + this.currentMonth + "/" + this.currentYear);
  }


}
