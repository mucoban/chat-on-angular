import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit, OnDestroy {

  isAgentLoggedIn: boolean;
  private destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer2: Renderer2,
  ) { }

  ngOnInit(): void {
    this.renderer2.setStyle(document.body, 'width', 'auto');
    this.renderer2.setStyle(document.body, 'height', '100vh');
    this.renderer2.setStyle(document.body, 'position', 'static');

    this.isAgentLoggedIn = this.authService._isAgentSignedIn;
    this.authService.isFbUserSingedIn
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: value => {
        this.isAgentLoggedIn = value;
      } });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogout() { this.authService.signOut(); }

}
