import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../shared/shared.module";
import {CustomerService} from "../shared/services/customer.service";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {CustomerStateReducer, MessagesReducer} from "../store/reducer";

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
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ messages: MessagesReducer, customerState: CustomerStateReducer })
  ],
  providers: [CustomerService],
})
export class CustomerModule { }
