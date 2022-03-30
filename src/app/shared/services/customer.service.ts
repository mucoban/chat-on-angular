import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  userData: any; 
  isUserSingedIn = new Subject<boolean>();
  private clientId: string;
  
  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.clientId = '6fd8u565'; 

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        
        this.clientId = localStorage.getItem('clientId') as string;
        if (!this.clientId) {
            this.clientId = Math.random().toString(36).slice(-8);
            localStorage.setItem('clientId', this.clientId);
        }
        
        this.checkForChatRoom();
        this.isUserSingedIn.next(true);
      } else {
        localStorage.removeItem('user');
        this.signIn('webdeveloper.mucahitcoban@gmail.com', '123123aA.');
        this.isUserSingedIn.next(false);
      }
    });
  }

  signIn(email: string, password: string) { 
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
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

  checkForChatRoom() {
    const o = this.db.list('chatRooms', ref => ref.orderByChild('clientId').equalTo(this.clientId));
    o.snapshotChanges().subscribe((res) => {
      res = res.filter(i => (i.payload.val() as any)?.status === 'open');
      if (!res.length) { console.log('no'); }
      else { console.log(res[0].payload.val()); }
    });;
  }

}
