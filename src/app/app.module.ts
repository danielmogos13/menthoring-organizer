
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMoneyModule } from './modules/app-money/app-money.module';
import { AppTasksModule } from './modules/app-tasks/app-tasks.module';

@NgModule({
  declarations: [],
  imports: [
    AppMoneyModule,
    AppTasksModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
