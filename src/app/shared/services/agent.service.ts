import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Subject} from "rxjs";
import {MessageModel} from "../models/message.model";


@Injectable()
export class AgentService {

  newMessage = new Subject<{time: number, sender: string, message: string}>();
  private messages: MessageModel[] = [];

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }


  getChats() {
    const o = this.db.list('chatRooms', ref => ref.orderByChild('timestamp'));
    return o.snapshotChanges();
  }

  takeChat(id: string) {
    return this.db.list('chatRooms').update(id, { isAgent: true, agenntId: 123 });
  }

  enterChat(chatId: string) {
    this.messages = [];
    const o = this.db.list('chatRooms/' + chatId);
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
            const newMessageItem = {
              time: messageItem.time,
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


  sendMessage(chatId: string, message: string) {
    const newMessageItem: MessageModel  = { time: new Date().getTime(), sender: 'client', message: message };
    this.db.list('chatRooms/' + chatId + '/messages').push(newMessageItem);
  }

}
