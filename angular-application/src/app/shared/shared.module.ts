import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgScrollbarModule} from "ngx-scrollbar";
import { PreloaderComponent } from './components/preloader/preloader.component';
import {MessagesComponent} from "./components/messages/messages.component";

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
