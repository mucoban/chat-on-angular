import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {NgScrollbar} from "ngx-scrollbar";
import {MessageModel} from "../../models/message.model";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    animations: [
        trigger("messagesAni", [
            transition('void => *', animate(200, keyframes([
                style({ transform: 'scale(1) translateY(20px)', transformOrigin: '100% 100%', opacity: 0, offset: 0 }),
                style({ transform: 'scale(1) translateX(0px)', opacity: 1, offset: 1 })
            ])))
        ])
    ],
    standalone: false
})
export class MessagesComponent implements OnInit {

  inputForm = new UntypedFormGroup({
    "message": new UntypedFormControl()
  });

  @Input() isAgent: boolean = false
  @Input() messages: MessageModel[];
  @Input() newMessages: number;

  @Output() messageSent: EventEmitter<string> = new EventEmitter<string>();
  @Output() closeChat: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('scrollbarRef') scrollbarRef: NgScrollbar;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.newMessages && changes.newMessages.currentValue > 0) {
      setTimeout(() => { this.scrollbarRef.scrollTo({ bottom: 0 }) }, 100);
    }
  }

  sendMessage() {
    const message = this.inputForm.value.message
    if (message) {
      this.messageSent.emit(message)
      this.inputForm.reset();
    }
  }

}
