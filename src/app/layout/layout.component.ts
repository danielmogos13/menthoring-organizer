import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  role: string = 'basic';
  userTheme: string;
  themes: any = {
    admin: 'admin-theme',
    basic: 'basic-theme'
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const role = this.route.snapshot.data['role'];
    this.userTheme = this.getUserTheme(role);
  }

  sideBarOpened = true;

  getUserTheme (role) {
    return this.themes[role];
  }

}
