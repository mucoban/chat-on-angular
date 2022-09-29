import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  isFbUserSingedIn = new Subject<boolean>();

  private fbUser = 'fbUser';

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    ) {  }

  signInCheck() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (localStorage.getItem(this.fbUser)) localStorage.setItem(this.fbUser, 'true');
        setTimeout(() => { this.isFbUserSingedIn.next(true); }, 0);
      } else {
        this.signIn('webdeveloper.mucahitcoban@gmail.com', '123123aA.');
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        localStorage.setItem(this.fbUser, 'true');
        this.isFbUserSingedIn.next(true);
      }).catch((error) => { console.log(error); })
  }

  signOut() {
    return this.afAuth.signOut()
      .then((result) => {
        // localStorage.removeItem(this.fbUser);
        this.isFbUserSingedIn.next(false);
      }).catch((error) => console.log);
  }

}
