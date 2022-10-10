import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent.component';
import { RouterModule } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import {AgentService} from "../shared/services/agent.service";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    AgentComponent,
    ChatListComponent,
    ChatDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'chats', pathMatch: "full"},
      { path: '', component: AgentComponent, children: [
          { path: 'chats', component: ChatListComponent },
          { path: 'chats/:id', component: ChatDetailComponent },
        ] },
    ]),
    SharedModule
  ],
  providers: [ AgentService ]
})
export class AgentModule { }
