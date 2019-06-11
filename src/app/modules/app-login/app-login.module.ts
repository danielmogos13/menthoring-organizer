import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {NgMaterialModule} from '../ng-material/ng-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ButtonLoadingComponent } from '../../components/button-loading/button-loading.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserRegistrationComponent,
    ButtonLoadingComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMaterialModule,
    FormsModule,
    RouterModule
  ]
})
export class AppLoginModule { }
