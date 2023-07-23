import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {throwError} from "rxjs";
import {MessageModel} from "../models/message.model";
import {catchError} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {Store} from "@ngrx/store";
import {newMessage} from "../../store/actions";


@Injectable()
export class AgentService {

  private messages: MessageModel[] = [];

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private store: Store<{ newMessages: MessageModel[] }>,
  ) { }


  getAgentsChats(uid: string) {
    const o = this.db.list('chatRooms', ref => ref.orderByChild('agentUid').equalTo(uid));
    return o.snapshotChanges().pipe(catchError((err) => this.handleError(err)));
  }

  getNewChats() {
    const o = this.db.list('chatRooms', ref => ref.orderByChild('isAgent').equalTo(false));
    return o.snapshotChanges().pipe(catchError((err) => this.handleError(err)));
  }

  takeChat(uid: string, id: string) {
    return this.db.list('chatRooms').update(id, { isAgent: true, agentUid: uid});
  }

  endTheChat(id: string) {
    return this.db.list('chatRooms').update(id, { status: 'closed' });
  }

  deleteChat(id: string) {
    return this.db.list('chatRooms').remove(id);
  }

  enterChat(chatId: string) {
    this.messages = [];
    const o = this.db.list('chatRooms/' + chatId);
    o.snapshotChanges()
      .pipe(catchError((err) => this.handleError(err)))
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
            this.store.dispatch(newMessage(newMessageItem))
          }
          return messageItem;
        });

      });
  }


  sendMessage(chatId: string, message: string) {
    const newMessageItem: MessageModel  = { time: new Date().getTime(), sender: 'agent', message: message };
    this.db.list('chatRooms/' + chatId + '/messages').push(newMessageItem);
  }

  private handleError(error: any) {
    if (error.code === 'PERMISSION_DENIED') { this.authService.signOut(); }
    return throwError(error.message);
  }

}
