import {Component, OnInit, Renderer2} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer2: Renderer2,
  ) { }

  ngOnInit(): void {
    this.renderer2.setStyle(document.body, 'width', 'auto');
    this.renderer2.setStyle(document.body, 'position', 'static');
  }

  onLogout() { this.authService.signOut(); }

}
