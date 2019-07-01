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
import {CommonCustomModulesModule} from './modules/app-common/commonCustomModules.module';
import {AuthGuard} from './services/auth-guard/auth-guard.service';
import {UserRole} from './services/appRoles/app-roles.service';
import {SideBarComponent} from './layout/side-bar/side-bar.component';
import {LayoutComponent} from './layout/layout.component';
import {AppContentComponent} from './layout/app-content/app-content.component';
import {AppViewsComponent} from './layout/app-content/app-views/app-views.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './services/httpInterceptors/httpInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    LayoutComponent,
    AppContentComponent,
    AppViewsComponent,
  ],
  imports: [
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CommonCustomModulesModule,
    AppLoginModule,
    AppMoneyModule,
    AppTasksModule,
  ],
  providers: [
    AuthGuard,
    UserRole,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
