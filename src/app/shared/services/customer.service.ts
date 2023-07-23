import {Injectable} from "@angular/core";
import {MessageModel} from "../models/message.model";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {first} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {newMessage, setCustomerState} from "../../store/actions";


@Injectable()
export class CustomerService {
  private messages: MessageModel[] = [];
  private clientId: string = '';
  private chatRoomId: string = '';

  constructor(
    private db: AngularFireDatabase,
    private httpClient: HttpClient,
    private store: Store<{ messages: MessageModel[], customerState: string }>,
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
      this.initChatRoom(true);
    });
  }

  private initChatRoom(isCreateChatRoom?: boolean) {
    if (isCreateChatRoom) {
      this.sendNotificationEmail();
      this.store.dispatch(setCustomerState('chat-started'))
    } else {
      this.store.dispatch(setCustomerState('chat-started'))
    }
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
            this.store.dispatch(newMessage(newMessageItem))
           }
          return messageItem;
        });

      });
  }

  private sendNotificationEmail() {
    if (environment.formspreeApiUrl)
    this.httpClient.post(environment.formspreeApiUrl, { email: 'a@a.com', message: 'new coa customer has started chating' })
      .subscribe();
  }

  sendMessage(message: string) {
    const newMessageItem: MessageModel  = { time: new Date().getTime(), sender: 'client', message: message };
    this.db.list('chatRooms/' + this.chatRoomId + '/messages').push(newMessageItem);
  }


  endChat() {
    this.db.list('chatRooms').update(this.chatRoomId, { status: 'closed' });
    this.store.dispatch(setCustomerState('waiting'))
    this.chatRoomId = '';
    this.messages = [];
  }

}
