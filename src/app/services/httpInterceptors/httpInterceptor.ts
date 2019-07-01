import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'


@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        if(event instanceof HttpErrorResponse){

        }

        return event;
      }),
      catchError(
        err =>
          new Observable<HttpEvent<any>>(observer => {
            if (err instanceof HttpErrorResponse) {
              this.openSnackBar("An error has occurred");
            }
            observer.error(err);
            observer.complete();
          })
      ));
  }


  openSnackBar(text) {
    this._snackBar.open( "An error has occurred",
      "",
      {
      politeness: "polite",
      verticalPosition: 'top'
    });
  }
}
