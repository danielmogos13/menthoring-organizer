import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {CommonCustomModulesModule} from '../app-common/commonCustomModules.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';


@NgModule({
  declarations: [
    LoginComponent,
    UserRegistrationComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonCustomModulesModule,
    FormsModule,
    RouterModule
  ]
})
export class AppLoginModule { }
