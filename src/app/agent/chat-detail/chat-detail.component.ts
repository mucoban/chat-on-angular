import {Component, OnDestroy, OnInit} from '@angular/core';
import {AgentService} from "../../shared/services/agent.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MessageModel} from "../../shared/models/message.model";
import {Store} from "@ngrx/store";
import {emtpyMessages} from "../../store/actions";

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit, OnDestroy {

  private chatId: string;
  messages: MessageModel[] = [];
  newMessages: number = 0;

  private destroy$ = new Subject<boolean>();

  constructor(
    private agentService: AgentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ messages: MessageModel[], agent: string }>,
  ) { }

  ngOnInit(): void {
    this.chatId = this.activatedRoute.snapshot.params.id;
    this.agentService.enterChat(this.chatId);

    this.store.select('messages')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        console.log('chatdetail res', res)
        this.messages = res
        this.newMessages++;
      });

    this.store.select('agent')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
         if (res === 'endTheChat') {
           this.endTheChat()
         }
      });
  }

  ngOnDestroy() {
    this.store.dispatch(emtpyMessages())
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  sendMessage(message: string) {
    this.agentService.sendMessage(this.chatId, message);
  }

  endTheChat() {
    if (confirm('are you sure?')) {
      this.agentService.endTheChat(this.chatId);
      this.router.navigate(['../'], { relativeTo: this.activatedRoute })
    }
  }

}
