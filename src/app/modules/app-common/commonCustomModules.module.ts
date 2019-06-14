import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule, MatTreeModule, MatIconModule,
  MatSidenavModule, MatTabsModule, MatCardModule, MatDialogModule,
  MatFormFieldModule, MatInputModule, MatDatepickerModule,
  MatSelectModule, MatBadgeModule, MatProgressSpinnerModule,
  MatSnackBarModule, MatMenuModule, MatNativeDateModule, MAT_DATE_LOCALE
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {DeleteDialogComponent} from '../../components/delete-dialog/delete-dialog.component';
import {ActionPerformedComponent} from '../../components/action-performed/action-performed.component';
import {RouterModule} from '@angular/router';
import { AppTimeIntervalComponent } from '../../components/app-time-interval/app-time-interval.component';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    ActionPerformedComponent,
    AppTimeIntervalComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    AppTimeIntervalComponent
  ],
  entryComponents: [DeleteDialogComponent, ActionPerformedComponent],
  providers: [
    AngularFireDatabaseModule,
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'ro-RO'},
  ]
})
export class CommonCustomModulesModule { }
