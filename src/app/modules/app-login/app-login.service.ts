import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  constructor(private authModule: AngularFireAuth) {}

  loginWithGoogle() {
    return this.authModule.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginWithEmailAndPassword(userCredentials) {
    return this.authModule.auth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
  }

}
