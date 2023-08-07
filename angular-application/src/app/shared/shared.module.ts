import {NgModule} from "@angular/core";
import {MessagesComponent} from "../messages/messages.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgScrollbarModule} from "ngx-scrollbar";

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgScrollbarModule
  ],
  exports: [
    MessagesComponent,
  ],
  providers: []
})
export class SharedModule {}
