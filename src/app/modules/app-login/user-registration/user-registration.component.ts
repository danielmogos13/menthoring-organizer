import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppLoginService} from '../app-login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: any;

  constructor(
    private loginService: AppLoginService,
    private _router: Router,
    private _ngZone: NgZone)
  {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl("", Validators.minLength(2)),
      firstName: new FormControl("", Validators.minLength(2)),
      lastName: new FormControl("", Validators.minLength(2)),
      password: new FormControl("", Validators.minLength(2)),
      terms: new FormControl(false, Validators.pattern('true')),
      admin: new FormControl(false),
    });
  }

  registerUser () {
    let user = {
      email: this.registrationForm.value.email,
      emailVerified: false,
      password: this.registrationForm.value.password,
      displayName: this.registrationForm.value.lastName + " " + this.registrationForm.value.firstName,
      disabled: false,
      admin: this.registrationForm.value.admin
    };

    this.loginService.addUser(user).then(userResult => {
      let userData = {
        uid: userResult.uid,
        name: userResult.displayName,
        email:userResult.email,
        picture: userResult.photoURL
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));
      this._ngZone.run(() => this._router.navigate(['/app/tasks/dayview']));
    });
  }

}
