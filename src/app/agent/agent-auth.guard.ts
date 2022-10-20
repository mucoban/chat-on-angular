import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";

@Injectable()
export class AgentAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService._isAgentSignedIn || (route.children && route.children[0].data?.noGuard)) return true;
    else return this.router.createUrlTree(['agent/login'])
  }
}
