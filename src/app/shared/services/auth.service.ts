import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  isFbUserSingedIn = new Subject<boolean>();

  private fbUser = '';
  private fbUserLsStr = 'fbUser';

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    ) {  }

  signInCheck(data: { email: string, password: string }) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = {uid: user.uid};
        if (localStorage.getItem(this.fbUserLsStr)) localStorage.setItem(this.fbUserLsStr, 'true');
        setTimeout(() => { this.isFbUserSingedIn.next(true); }, 0);
      } else {
        this.signIn(data.email, data.password);
        // this.signIn('webdeveloper.mucahitcoban@gmail.com', '123123aA.');
        // this.signIn('mchdcbn10@gmail.com', '247600gg??');
      }
    });
  }

  signIn(email: string, password: string) { debugger
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        localStorage.setItem(this.fbUserLsStr, 'true');
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
