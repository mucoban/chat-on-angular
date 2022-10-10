import { Component, OnInit } from '@angular/core';
import {AgentService} from "../../shared/services/agent.service";
import {first} from "rxjs/operators";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

interface ChatList {
  key: string,
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
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.authService.signOut();
    this.authService.signInCheck({ email: 'webdeveloper.mucahitcoban@gmail.com', password: '123123aA.' });

    this.authService.isFbUserSingedIn
      .pipe(first())
      .subscribe(result => {
        this.agentService.getChats()
          .pipe(first())
          .subscribe((res) => {
            const chats = res.map(i => {
              const chat = i.payload.val() as any;
              chat.key = i.key;
              chat.date = new Date(chat.date).toLocaleString();
              chat.firstMessage = '';
              if (chat.messages) {
                chat.messagesArray = Object.values(chat.messages);
                chat.firstMessage = chat.messagesArray[0] ? chat.messagesArray[0].message : '';
              }
              return chat;
            });
            const newChats = chats.filter((i: any)  => !i.isAgent && i.status === 'open');
            const takenChats = chats.filter((i: any) => !i.isAgent && i.status === 'open');
            const closedChats = chats.filter((i: any) => i.status !== 'open');
            this.newChats = newChats as any;
            this.closedChats = closedChats as any;
        });;
      });
  }

  takeChat(id: string) { debugger
    this.agentService.takeChat(id).then(result => { this.router.navigate(['agent/chats/' + id]) });
  }

}
