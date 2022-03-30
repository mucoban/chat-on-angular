import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.customerService.isUserSingedIn
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);      
    this.destroy$.unsubscribe();      
  }

}
