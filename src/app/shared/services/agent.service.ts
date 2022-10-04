import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable()
export class AgentService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }


  getChats() {
    const o = this.db.list('chatRooms', ref => ref.orderByChild('timestamp'));
    return o.snapshotChanges();

  }

}
