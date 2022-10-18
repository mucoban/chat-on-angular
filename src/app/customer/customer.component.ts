import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';
import {MessageModel} from '../shared/models/message.model';
import {CustomerService} from '../shared/services/customer.service';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();
  customerStatus: String = 'waiting';
  messages: MessageModel[] = [];
  newMessages: number = 0;

  inputForm = new FormGroup({
    "message": new FormControl()
  });

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.authService.signInCheckRemote({ email: 'mchdcbn10@gmail.com', password: '123123aA.' });

    this.authService.isFbUserSingedIn
      .pipe(first())
      .subscribe(result => {
      if (result) this.continueToInit();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setCustomerStatus(status: string) {
    if (status === 'chat-started') { parent.postMessage([{ prop: 'height', value: '495px' }], "*"); }
    else { parent.postMessage([{ prop: 'height', value: '70px' }], "*"); }
    this.customerStatus = status;
  }

  private continueToInit() {
    this.customerService.customerStatus
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => { this.setCustomerStatus(res); });

    this.customerService.newMessage
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.messages.push(res);
        this.newMessages++;
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

}
