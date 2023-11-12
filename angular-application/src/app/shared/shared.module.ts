import {NgModule} from "@angular/core";
import {MessagesComponent} from "../messages/messages.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgScrollbarModule} from "ngx-scrollbar";
import { PreloaderComponent } from './components/preloader/preloader.component';

@NgModule({
  declarations: [
    MessagesComponent,
    PreloaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgScrollbarModule
  ],
  exports: [
    MessagesComponent,
    PreloaderComponent,
  ],
  providers: []
})
export class SharedModule {}
