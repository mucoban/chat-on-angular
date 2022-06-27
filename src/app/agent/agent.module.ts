import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AgentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AgentComponent }
    ])
  ]
})
export class AgentModule { }
