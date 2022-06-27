import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 1,
    swipeEasing: false
  };

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CustomerComponent }
    ]),
    ReactiveFormsModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class CustomerModule { }
