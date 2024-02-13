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
  isFbAgentSingedIn = new Subject<boolean>();

  private fbUserLsStr = 'fbUser';
  private fbAgentLsStr = 'fbAgent';

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    ) {  }

  get _agentDetail() { return localStorage.getItem(this.fbAgentLsStr) }

  get _isAgentSignedIn(): boolean {
    return Boolean(this._agentDetail);
  }

  signInCheckRemote(data?: null | { email: string, password: string }) {
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

  signIn(email: string, password: string, isAgent?: boolean) {
    const promise = new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          localStorage.setItem(isAgent ? this.fbAgentLsStr : this.fbUserLsStr, result.user?.uid || '');
          isAgent ? this.isFbAgentSingedIn.next(true) : this.isFbUserSingedIn.next(true);
          resolve('');
        })
        .catch((error) => {
          console.log(error);
          reject(error.message);
          localStorage.setItem(isAgent ? this.fbAgentLsStr : this.fbUserLsStr, '');
        });
    });

    return promise;
  }

  signOut(isAgent?: boolean) {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem(isAgent ? this.fbAgentLsStr : this.fbUserLsStr);
      (isAgent ? this.isFbAgentSingedIn : this.isFbUserSingedIn).next(false);
      this.router.navigate(['/agent/login']);
    });
  }

}
