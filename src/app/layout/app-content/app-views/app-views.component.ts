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

  checkIfChildRouteIsActive () {
    return this._router.url === "/app/tasks/dayview" || this._router.url === "/app/tasks/weekview";
  }

}
