import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true,
//   wheelSpeed: 1,
//   swipeEasing: false
// };

const routes: Routes = [
  { path: '', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'agent', loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule) }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // PerfectScrollbarModule,
    BrowserAnimationsModule
  ],
  providers: [
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // }
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
