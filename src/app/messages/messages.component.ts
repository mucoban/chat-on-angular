import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MessageModel} from "../shared/models/message.model";
import {FormControl, FormGroup} from "@angular/forms";
import {PerfectScrollbarComponent, PerfectScrollbarDirective} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  inputForm = new FormGroup({
    "message": new FormControl()
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
