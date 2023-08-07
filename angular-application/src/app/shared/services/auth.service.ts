import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  isFbUserSingedIn = new Subject<boolean>();

  private fbUserLsStr = 'fbUser';

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    ) {  }

  get _isAgentSignedIn(): boolean {
    return Boolean(localStorage.getItem(this.fbUserLsStr));
  }

  signInCheckRemote(data?: { email: string, password: string }) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = {uid: user.uid};
        localStorage.setItem(this.fbUserLsStr, '1');
        setTimeout(() => { this.isFbUserSingedIn.next(true); }, 0);
      } else {
        if (data) this.signIn(data.email, data.password);
        else this.signOut();
      }
    });
  }

  signIn(email: string, password: string) {
    const promise = new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          localStorage.setItem(this.fbUserLsStr, '1');
          this.isFbUserSingedIn.next(true);
          resolve('');
        })
        .catch((error) => {
          console.log(error);
          reject(error.message);
          localStorage.setItem(this.fbUserLsStr, '');
        });
    });

    return promise;
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      localStorage.setItem(this.fbUserLsStr, '');
      this.isFbUserSingedIn.next(false);
      this.router.navigate(['/agent/login']);
    });
  }

}
