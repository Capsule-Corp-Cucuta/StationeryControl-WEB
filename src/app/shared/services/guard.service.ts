import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Constants } from '../constants/global-constants';
import { FacadeService } from '../../core/services/facade.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  private readonly URIS = Constants.ROUTES;

  constructor(private service: FacadeService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.service.getToken()) {
      this.router.navigate([this.URIS.SECURITY]);
      return false;
    }
    return true;
  }
}
