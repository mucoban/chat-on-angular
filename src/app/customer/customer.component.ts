import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerService } from '../shared/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();
  customerStatus: String = 'waiting';
  
  inputForm = new FormGroup({
    "message": new FormControl()
  });

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {

    this.customerService.customerStatus
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => { this.customerStatus = res; });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);      
    this.destroy$.unsubscribe();      
  }

  initChat() {
    this.customerService.initCustomer();
  }

  onSubmit() {
    console.log(this.inputForm.value);
    this.inputForm.reset();
  }

}
