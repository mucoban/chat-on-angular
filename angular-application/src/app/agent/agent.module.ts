import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentComponent} from './agent.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {AgentAuthGuard} from "./agent-auth.guard";
import {LoginComponent} from "./login/login.component";
import {ChatListComponent} from "./chat-list/chat-list.component";
import {ChatDetailComponent} from "./chat-detail/chat-detail.component";
import {AgentService} from "../shared/services/agent.service";
import {SharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {AgentReducer, MessagesReducer} from "../store/reducer";


@NgModule({
  declarations: [
    AgentComponent,
    ChatListComponent,
    ChatDetailComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'chats', pathMatch: "full"},
      { path: '', canActivate: [ AgentAuthGuard ], component: AgentComponent, children: [
          { path: 'login', component: LoginComponent, data: { noGuard: true } },
          { path: 'chats', component: ChatListComponent },
          { path: 'chats/:id', component: ChatDetailComponent },
        ] },
    ]),
    SharedModule,
    StoreModule.forRoot({ messages: MessagesReducer, agent: AgentReducer })
  ],
  providers: [ AgentService, AgentAuthGuard ]
})
export class AgentModule { }
