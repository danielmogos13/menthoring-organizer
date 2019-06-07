import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {first} from 'rxjs/internal/operators/first';


@Injectable({
  providedIn: 'root'
})
export class UserRole implements Resolve<any>{

  constructor(
    private firestore: AngularFirestore,
    private _router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot){
    let userId = JSON.parse(localStorage.getItem('currentUser'));

    if(!userId){
      this._router.navigate(['/login']);
    }else {
      let userDoc = this.firestore.doc('users/' + userId.uid);

      return userDoc.valueChanges()
        .pipe(map(data => {
          // @ts-ignore
          return data.role;
        }))
        .pipe(first())
    }

  }
}
