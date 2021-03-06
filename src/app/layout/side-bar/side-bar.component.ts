import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private _router: Router) { }

  currentDate = new Date();
  months: any = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  days: any = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  currentDayNumber: number = this.currentDate.getDate();
  currentDayString: string = this.currentDayNumber < 10 ? "0" + this.currentDayNumber: this.currentDayNumber.toString();
  currentMonth: string = this.months[this.currentDate.getMonth()];
  currentDayName: string = this.days[this.currentDate.getDay()];
  currentYear: number = this.currentDate.getFullYear();


  ngOnInit() {

  }

  checkRoute (page) {
    return this._router.url.indexOf(page) !== -1;
  }
}


