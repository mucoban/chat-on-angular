import {NgModule} from "@angular/core";
import {MessagesComponent} from "../messages/messages.component";
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {ReactiveFormsModule} from "@angular/forms";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  swipeEasing: false
};

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    ReactiveFormsModule,
    PerfectScrollbarModule,
  ],
  exports: [
    MessagesComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule {}
