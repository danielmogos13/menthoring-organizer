import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar-todo';
  class = 'my-default-theme';

  constructor(private _router: Router, private authModule: AngularFireAuth) { }

  ngOnInit() {
  }

}
