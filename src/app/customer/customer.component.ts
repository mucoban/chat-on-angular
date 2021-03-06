import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageModel } from '../shared/models/message.model';
import { CustomerService } from '../shared/services/customer.service';
import { DimensionsService } from '../shared/services/dimensions.service';
 
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
    private customerService: CustomerService,
    private dimensionsService: DimensionsService,
  ) { }

  ngOnInit(): void {

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

  ngOnDestroy(): void {
    this.destroy$.next(true);      
    this.destroy$.unsubscribe();      
  }

  createChatRoom() {
    this.customerService.createChatRoom();
  }

  insertMessage() {
    console.log(this.inputForm.value);
    this.customerService.sendMessage(this.inputForm.value.message);
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
