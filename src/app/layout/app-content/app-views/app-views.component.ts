import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-views',
  templateUrl: './app-views.component.html',
  styleUrls: ['./app-views.component.scss']
})
export class AppViewsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }


  checkIfChildRouteIsActive (tasksRouter) {

  return tasksRouter.router.routerState.snapshot.url === "/tasks/dayview" ||
      tasksRouter.router.routerState.snapshot.url === "/tasks/weekview";

  }

}
