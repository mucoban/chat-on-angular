import { Component, OnInit } from '@angular/core';
import {AgentService} from "../../shared/services/agent.service";
import {first} from "rxjs/operators";
import {AuthService} from "../../shared/services/auth.service";

interface ChatList {
  date: string,
  firstMessage?: string,
}

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  newChats: ChatList[];
  closedChats: ChatList[];

  constructor(
    private authService: AuthService,
    private agentService: AgentService,
  ) { }

  ngOnInit(): void {
    this.authService.signInCheck();

    this.authService.isFbUserSingedIn
      .pipe(first())
      .subscribe(result => {
        this.agentService.getChats()
          .pipe(first())
          .subscribe((res) => {
          const chats = res.map(i => {
            const chat = i.payload.val() as any;
            chat.date = new Date(chat.date).toLocaleString();
            chat.firstMessage = '';
            if (chat.messages) {
              chat.messagesArray = Object.values(chat.messages);
              chat.firstMessage = chat.messagesArray[0] ? chat.messagesArray[0].message : '';
            }
            return chat;
          });
          const newChats = chats.filter((i: any)  => i.isAgent === 0 && i.status === 'open');
          const takenChats = chats.filter((i: any) => i.isAgent === 1 && i.status === 'open');
          const closedChats = chats.filter((i: any) => i.status !== 'open');
          this.newChats = newChats as any;
          this.closedChats = closedChats as any;
        });;
      });
  }

}
