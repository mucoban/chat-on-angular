import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; 
  isUserSingedIn = new Subject<boolean>();
  
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    /* public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
   */) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') as string);
      } else {
        localStorage.removeItem('user');
        JSON.parse(localStorage.getItem('user') as string);
      }
    })
    }

  SignIn(email: string, password: string) { 
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.isUserSingedIn.next(true);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  private SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

}
