import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subject} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {takeUntil} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {callAction} from "../store/actions";

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit, OnDestroy {

  isAgentLoggedIn: boolean
  isChatDetail: boolean
  private destroy$ = new Subject<boolean>()

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer2: Renderer2,
    private store: Store<{agent: string}>,
  ) { }

  ngOnInit(): void {
    this.renderer2.setStyle(document.body, 'width', 'auto');
    this.renderer2.setStyle(document.body, 'height', '100vh');
    this.renderer2.setStyle(document.body, 'position', 'static');

    this.isAgentLoggedIn = this.authService._isAgentSignedIn;
    this.authService.isFbAgentSingedIn
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: value => {
        this.isAgentLoggedIn = value;
      } });

    const setIsChatDetail = (url: string) => { this.isChatDetail = Boolean(url.match(/\/agent\/chats\/(.*?)/)) }
    setIsChatDetail(window.location.href)
    this.router.events.subscribe(event => { if (event instanceof NavigationEnd) { setIsChatDetail(event.url) } })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  endTheChat() {
    this.store.dispatch(callAction('endTheChat'))
    this.store.dispatch(callAction(null))
  }

  onLogout() { this.authService.signOut(true); }

}
