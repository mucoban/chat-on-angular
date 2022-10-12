import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageModel} from "../shared/models/message.model";
import {FormControl, FormGroup} from "@angular/forms";

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
  @Output() messageSent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage() {
    this.messageSent.emit(this.inputForm.value.message)
    this.inputForm.reset();
  }

}
