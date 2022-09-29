import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { first } from 'rxjs/operators';
import { MessageModel } from '../models/message.model';


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }


}
