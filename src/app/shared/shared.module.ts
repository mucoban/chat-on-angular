import {NgModule} from "@angular/core";
import {MessagesComponent} from "../messages/messages.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true,
//   wheelSpeed: 1,
//   swipeEasing: false
// };

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // PerfectScrollbarModule,
  ],
  exports: [
    MessagesComponent,
  ],
  providers: [
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // }
  ]
})
export class SharedModule {}
