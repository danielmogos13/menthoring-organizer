import { Component, OnInit } from '@angular/core';
import {AppLoginService} from '../../modules/app-login/app-login.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ExpenseSettingsComponent} from '../../components/expense-settings/expense-settings.component';


@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit {
  user: any;
  noProfilePicPath = '../../../assets/img/noProfilePic.png';
  imagePath: string;

  constructor(private loginService: AppLoginService,
  private _router: Router,
  private dialog: MatDialog) { }

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

  showExpenseSettingsModal () {
    const dialogRef = this.dialog.open(ExpenseSettingsComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success'){
        location.reload();
      }
    });

  }

}
