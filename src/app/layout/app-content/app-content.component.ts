import { Component, OnInit } from '@angular/core';
import {AppLoginService} from '../../modules/app-login/app-login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit {
  user: any;
  noProfilePicPath = '../../../assets/img/noProfilePic.png';
  imagePath: string;

  constructor(private loginService: AppLoginService, private _router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.imagePath = this.user.picture ? this.user.picture: this.noProfilePicPath;
  }

  logOut () {
    this.loginService.signOut()
      .then(result => {
        localStorage.removeItem('currentUser');
        this._router.navigate(['/login']);
    })
  }
}
