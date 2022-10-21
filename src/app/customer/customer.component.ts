import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';
import {MessageModel} from '../shared/models/message.model';
import {CustomerService} from '../shared/services/customer.service';
import {AuthService} from "../shared/services/auth.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();
  private isParentMobile: boolean;
  customerStatus: string = 'waiting';
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
    this.authService.signInCheckRemote({ email: environment.customer.email, password: environment.customer.password });

    this.authService.isFbUserSingedIn
      .pipe(first())
      .subscribe(result => {
      if (result) this.continueToInit();
    });

  }

  @HostListener('window:message', ['$event'])
  onMessage(event: any) {
    if (event.data.innerWidth) this.isParentMobile = event.data.innerWidth < 992;
    this.setCustomerStatus(this.customerStatus);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setCustomerStatus(status: string) {
    if (status === 'chat-started') {
      if (this.isParentMobile) parent.postMessage([
          { prop: 'width', value: '100%' },
          { prop: 'height', value: '100%' },
        ], "*");
      else parent.postMessage([{ prop: 'width', value: '304px' }, { prop: 'height', value: '565px' }], "*");
    }
    else {
      parent.postMessage([
        { prop: 'width', value: '100px' },
        { prop: 'height', value: '90px' },
      ], "*");
    }
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
