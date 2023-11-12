import {Component, OnDestroy, OnInit} from '@angular/core';
import {AgentService} from "../../shared/services/agent.service";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {first, takeUntil} from "rxjs/operators";
import {MessageModel} from "../../shared/models/message.model";

interface ChatList {
  key: string,
  date: string,
  cardMessage?: string,
}

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {

  newChats: ChatList[] =  [];
  activeChats: ChatList[] = [];
  closedChats: ChatList[] = [];
  preloaders = {
    newChats: true,
    activeChats: true,
    closedChats: true,
  }
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private agentService: AgentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.signInCheckRemote();

    this.authService.isFbUserSingedIn
      .pipe(first())
      .subscribe(result => {

        this.agentService.getNewChats()
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            const chats = this.processChats(res);
            const newChats = chats.filter((i: any) => i.status === 'open');
            this.newChats = newChats as any;
            this.preloaders.newChats = false
        });

        this.agentService.getAgentsChats(this.authService.user.uid)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            const chats = this.processChats(res);
            const activeChats = chats.filter((i: any) => i.status === 'open');
            const closedChats = chats.filter((i: any) => i.status !== 'open');
            this.activeChats = activeChats as any;
            this.closedChats = closedChats as any;
            this.preloaders.activeChats = this.preloaders.closedChats = false
          });

      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  takeChat(id: string) {
    this.agentService.takeChat(this.authService.user.uid, id)
      .then(result => { this.router.navigate(['agent/chats/' + id]) });
  }

  private processChats(res: any) {
    const chats = res.map((i: any) => {
      const chat = i.payload.val() as any;
      chat.key = i.key;
      chat.date = new Date(chat.date).toLocaleString();
      chat.cardMessage = '';
      if (chat.messages) {
        chat.messagesArray = (Object.values(chat.messages) as []).filter((m: MessageModel) => !m.isInfo);
        chat.messageCount = chat.messagesArray.length;
        chat.cardMessage = chat.messagesArray.length ? chat.messagesArray.pop().message : '';
      }
      return chat;
    });
    return chats;
  }

  deleteChat(id: string) {
    if (confirm('chat will be deleted?')) this.agentService.deleteChat(id)
  }

}
