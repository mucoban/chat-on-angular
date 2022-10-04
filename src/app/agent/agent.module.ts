import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent.component';
import { RouterModule } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import {AgentService} from "../shared/services/agent.service";



@NgModule({
  declarations: [
    AgentComponent,
    ChatListComponent,
    ChatDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AgentComponent, children: [
          { path: 'chats', component: ChatListComponent },
          { path: 'chats/:id', component: ChatDetailComponent },
        ] },
      { path: '', redirectTo: 'chats', pathMatch: "full"},
    ])
  ],
  providers: [ AgentService ]
})
export class AgentModule { }
