import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';
import { MessageModel } from '../shared/models/message.model';
import { CustomerService } from '../shared/services/customer.service';
import { DimensionsService } from '../shared/services/dimensions.service';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

  @ViewChild(PerfectScrollbarComponent) perfectScrollbarComponent?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective) perfectScrollbarDirective?: PerfectScrollbarDirective;

  private destroy$ = new Subject<boolean>();
  customerStatus: String = 'waiting';
  messages: MessageModel[] = [];

  inputForm = new FormGroup({
    "message": new FormControl()
  });

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private dimensionsService: DimensionsService,
  ) { }

  ngOnInit(): void {
    this.authService.signInCheck({ email: 'mchdcbn10@gmail.com', password: '123123aA.' });;

    this.authService.isFbUserSingedIn
      .pipe(first())
      .subscribe(result => {
      if (result) this.continueToInit();
    });

    // setTimeout(() => { this.authService.signOut(); }, 5000);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private continueToInit() {
    this.dimensionsService.customerMode();

    this.customerService.customerStatus
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res === 'chat-started') { this.dimensionsService.chatStarted(); }
        this.customerStatus = res;
      });


    this.customerService.newMessage
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.messages.push(res);
        setTimeout(() => { this.scrollToBottom(); }, 100);
      });

    this.customerService.initCustomer();
  }

  createChatRoom() {
    this.customerService.createChatRoom();
  }

  insertMessage(message: string) {
    this.customerService.sendMessage(message);
    this.inputForm.reset();
  }

  endChat() {
    this.customerService.endChat();
    this.messages = [];
  }

  private scrollToBottom() {
    (this.perfectScrollbarComponent as any)?.directiveRef.scrollToBottom();
  }

}
