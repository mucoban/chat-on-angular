import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {SharedModule} from "../shared/shared.module";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 1,
    swipeEasing: false
  };

@NgModule({
  declarations: [
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CustomerComponent }
    ]),
    ReactiveFormsModule,
    PerfectScrollbarModule,
    SharedModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class CustomerModule { }
