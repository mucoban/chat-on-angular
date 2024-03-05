import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';
import {MessageModel} from '../shared/models/message.model';
import {CustomerService} from '../shared/services/customer.service';
import {AuthService} from "../shared/services/auth.service";
import {environment} from "../../environments/environment";
import {Store} from "@ngrx/store";
import {setCustomerState} from "../store/actions";
import {ActivatedRoute, Router} from "@angular/router";
import {customerStates} from "../shared/models/customer-states";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();
  private isParentMobile: boolean;
  customerStatus: number;
  messages: MessageModel[] = [];
  newMessages: number = 0;

  inputForm = new UntypedFormGroup({
    "message": new UntypedFormControl()
  });

  protected readonly customerStates = customerStates;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private store: Store<{ messages: MessageModel[], customerState: string }>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const goToAgentPanel = this.activatedRoute.snapshot.queryParams['go-to-agent-panel']
    if (goToAgentPanel) this.router.navigate(['agent'])

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
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onClickSwitchButton() {
    switch (this.customerStatus) {
      case customerStates.chatStarted:
        this.store.dispatch(setCustomerState(customerStates.minimized))
        break
      case customerStates.waiting:
        this.createChatRoom()
        break
      case customerStates.minimized:
        this.store.dispatch(setCustomerState(customerStates.chatStarted))
        break
    }
  }

  handleCustomerStatus(status: number) {
    if (status === customerStates.chatStarted) {
      if (this.isParentMobile) parent.postMessage([
          { prop: 'width', value: '100%' },
          { prop: 'height', value: '100%' },
        ], "*");
      else parent.postMessage([{ prop: 'width', value: '324px' }, { prop: 'height', value: '575px' }], "*");
    }
    else {
      parent.postMessage([
        { prop: 'width', value: '70px' },
        { prop: 'height', value: '70px' },
      ], "*");
    }
    this.customerStatus = status;
  }

  private continueToInit() {
   this.store.select('customerState')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.handleCustomerStatus(res); });

    this.store.select('messages')
      .pipe(takeUntil(this.destroy$))
      .subscribe(res=> {
        this.messages = res
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
