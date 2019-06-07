import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authModule: AngularFireAuth, private _router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    if(user){
      return true;
    }

    return this.authModule.authState.pipe(
      map(loggedUser => {
        if (loggedUser) {
          return true;
        }

        this._router.navigate(['/login']);
        return false;
      })
    );

  }

}
