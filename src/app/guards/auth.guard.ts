import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { MoralisService } from '../services/moralis.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _moralisService: MoralisService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    // Store the attempted URL for redirecting
    this._moralisService.redirectUrl = url;

    if (this._moralisService.isAuthenticated) {
      return true;
    } else {
      return this._router.parseUrl('/login');
    }
  }
}
