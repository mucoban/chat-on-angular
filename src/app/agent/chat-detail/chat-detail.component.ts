import {Component, OnDestroy, OnInit} from '@angular/core';
import {AgentService} from "../../shared/services/agent.service";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MessageModel} from "../../shared/models/message.model";

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit, OnDestroy {

  private chatId: string;
  messages: MessageModel[] = [];

  private destroy$ = new Subject<boolean>();

  constructor(
    private agentService: AgentService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chatId = this.activatedRoute.snapshot.params.id;
    this.agentService.enterChat(this.chatId);

    this.agentService.newMessage
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.messages.push(res);
        // setTimeout(() => { this.scrollToBottom(); }, 100);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  sendMessage(message: string) {
    this.agentService.sendMessage(this.chatId, message);
  }

}
