import {Component, NgZone, OnInit} from '@angular/core';
import {AppLoginService} from '../app-login.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;

  constructor(
    private loginService: AppLoginService,
    private authModule: AngularFireAuth,
    private _router: Router,
    private _ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.minLength(2)),
      password: new FormControl("", Validators.minLength(2)),
    });
  }

  loginWithGoogle () {
    this.loginService.loginWithGoogle().then(result => {
      this.afterLogin(result);
    });
  }

  loginWithEmailAndPassword () {
    let userCredentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loginService.loginWithEmailAndPassword(userCredentials).then(result => {
      this.afterLogin(result);
    });

  }

  afterLogin(result) {
    let existingUser = JSON.parse(localStorage.getItem('currentUser'));

    if(result.user !== null){

      let userData = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        picture: result.user.photoURL
      };

      if(!existingUser){
        localStorage.setItem('currentUser', JSON.stringify(userData));
      }

      this._ngZone.run(() => this._router.navigate(['/app/tasks/dayview']));
    }
  }

}
