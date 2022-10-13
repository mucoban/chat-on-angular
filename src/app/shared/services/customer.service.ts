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
export class CustomerService {
  userData: any;
  customerStatus = new Subject<string>();
  newMessage = new Subject<{time: number, sender: string, message: string}>();
  private messages: MessageModel[] = [];
  private clientId: string = '';
  private chatRoomId: string = '';

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  initCustomer() {
    this.clientId = localStorage.getItem('clientId') as string;
    if (!this.clientId) {
      this.clientId = Math.random().toString(36).slice(-8);
      localStorage.setItem('clientId', this.clientId);
    }

    this.checkForChatRoom();
  }

  checkForChatRoom() {
    const o = this.db.list('chatRooms', ref => ref.orderByChild('clientId').equalTo(this.clientId));
    o.snapshotChanges()
      .pipe(first())
      .subscribe((res) => {
        res = res.filter(i => (i.payload.val() as any)?.status === 'open');
        if (!res.length) { console.log('no open chat room'); }
        else {
          this.chatRoomId = res[0].key as string;
          this.initChatRoom();
        }
      });
  }

  createChatRoom() {
    this.db.list('chatRooms').push({
        isAgent: false,
        clientId: this.clientId,
        date: new Date().toString(),
        status: 'open'
    }).then(res => {
      this.chatRoomId = res.key as string;
      this.initChatRoom();
    });
  }

  private initChatRoom() {
    this.customerStatus.next('chat-started');
    const o = this.db.list('chatRooms/' + this.chatRoomId);
    o.snapshotChanges()
      .subscribe((res) => {

        const status = res.find(i => i.key === 'status');
        const messages = res.find(i => i.key === 'messages');
        if (status?.payload.val() !== 'open' || !messages) return;

        const messagesPayload = Object.values((messages as any).payload.val())
          .sort((a: any, b: any) => a.time - b.time);

        (messagesPayload).map((item) => {
          const messageItem: any = item;
          const found = this.messages.find((tm: any) => tm.time === messageItem.time);
          if (!found) {
            const newDate = new Date(messageItem.time);
            const dateText = newDate.toTimeString().substr(0, 5);
            const newMessageItem = {
              time: messageItem.time,
              dateText: dateText,
               sender: messageItem.sender,
               message: messageItem.message
              };
            this.messages.push(newMessageItem);
            this.newMessage.next(newMessageItem);
           }
          return messageItem;
        });

      });
  }

  sendMessage(message: string) {
    const newMessageItem: MessageModel  = { time: new Date().getTime(), sender: 'client', message: message };
    this.db.list('chatRooms/' + this.chatRoomId + '/messages').push(newMessageItem);
  }


  endChat() {
    this.db.list('chatRooms').update(this.chatRoomId, { status: 'closed' });
    this.customerStatus.next('waiting');
    this.chatRoomId = '';
    this.messages = [];
  }

}
