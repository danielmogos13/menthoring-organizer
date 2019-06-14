import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-views',
  templateUrl: './app-views.component.html',
  styleUrls: ['./app-views.component.scss']
})
export class AppViewsComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {

  }

  checkIfTaskChildRouteIsActive () {
    return this._router.url === "/app/tasks/dayview" || this._router.url === "/app/tasks/weekview";
  }

  checkIfMoneyChildRouteIsActive () {
    return this._router.url === "/app/money/dayview" || this._router.url === "/app/money/weekview";
  }

}
