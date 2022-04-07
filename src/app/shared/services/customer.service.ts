import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  userData: any; 
  isUserSingedIn = new Subject<boolean>();
  customerStatus = new Subject<string>();
  private clientId: string = '';
  private chatRoomId: string = '';
  
  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  initCustomer() {
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
    o.snapshotChanges()
      .pipe(first())
      .subscribe((res) => {
          res = res.filter(i => (i.payload.val() as any)?.status === 'open');
          if (!res.length) { console.log('no'); }
          else { 
            this.chatRoomId = res[0].key as string;
            this.initChatRoom();
          }
      });
  }

  private initChatRoom() {
    this.customerStatus.next('chat-started');
    const o = this.db.list('chatRooms/' + this.chatRoomId);
    o.snapshotChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }

}
