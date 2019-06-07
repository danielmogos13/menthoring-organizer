import { NgModule } from '@angular/core';
import { AppLoginModule } from './modules/app-login/app-login.module';
import { AppMoneyModule } from './modules/app-money/app-money.module';
import { AppTasksModule } from './modules/app-tasks/app-tasks.module';
import { AppComponent } from './app.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NgMaterialModule} from './modules/ng-material/ng-material.module';
import {AuthGuard} from './services/auth-guard/auth-guard.service';

@NgModule({
  declarations: [],
  imports: [
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgMaterialModule,
    AppLoginModule,
    AppMoneyModule,
    AppTasksModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
