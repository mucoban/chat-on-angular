import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MessageModel} from "../shared/models/message.model";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {PerfectScrollbarComponent, PerfectScrollbarDirective} from "ngx-perfect-scrollbar";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    trigger("messagesAni", [
      transition('void => *', animate(300, keyframes([
        style({ transform: 'translateY(-50px)', offset: 0 }),
        style({ transform: 'translateX(0px)', offset: 1 })
      ])))
    ])
  ]
})
export class MessagesComponent implements OnInit {

  inputForm = new UntypedFormGroup({
    "message": new UntypedFormControl()
  });

  @Input() isAgent: boolean;
  @Input() messages: MessageModel[];
  @Input() newMessages: number;

  @Output() messageSent: EventEmitter<string> = new EventEmitter<string>();
  @Output() closeChat: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(PerfectScrollbarComponent) perfectScrollbarComponent?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective) perfectScrollbarDirective?: PerfectScrollbarDirective;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.newMessages && changes.newMessages.currentValue > 0) {
      setTimeout(() => { this.scrollToBottom(); }, 100);
    }
  }

  sendMessage() {
    this.messageSent.emit(this.inputForm.value.message)
    this.inputForm.reset();
  }

  onClickcloseChat() { this.closeChat.emit(); }

  private scrollToBottom() {
    (this.perfectScrollbarComponent as any)?.directiveRef.scrollToBottom();
  }

}
