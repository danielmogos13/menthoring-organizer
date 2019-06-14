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
import {AppStatsComponent} from './layout/side-bar/app-stats/app-stats.component';
import {AppViewsComponent} from './layout/app-content/app-views/app-views.component';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    LayoutComponent,
    AppContentComponent,
    AppStatsComponent,
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
    UserRole
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
