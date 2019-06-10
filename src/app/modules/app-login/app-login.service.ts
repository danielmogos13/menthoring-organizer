import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  constructor(private authModule: AngularFireAuth, private firestore: AngularFirestore) {}

  loginWithGoogle() {
    return this.authModule.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginWithEmailAndPassword(userCredentials) {
    return this.authModule.auth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
  }

  addUser (user) {
    return this.authModule.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userResult => {
        var createdUser = auth().currentUser;

        return createdUser.updateProfile({
          displayName: user.displayName,
        }).then(() => {
          // Update successful.

          return this.firestore.collection('users')
            .doc(createdUser.uid).set(user).then(() => {
              user.uid = createdUser.uid;
              return user;
            });

        }).catch(function(error) {
          // An error happened.
        });

      });
  }
}
