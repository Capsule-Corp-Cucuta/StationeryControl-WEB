import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Constants } from '../constants/global-constants';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  private URIS = Constants.ROUTES;

  private realRol: string;

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.tokenService.getToken()) {
      this.router.navigate([this.URIS.SECURITY]);
      return false;
    }
    return true;
  }
}
