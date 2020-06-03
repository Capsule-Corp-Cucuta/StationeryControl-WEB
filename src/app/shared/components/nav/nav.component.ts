import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Constants } from '../../constants/global-constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  public LINKS = Constants.LINKS;
  public ICONS = Constants.ICONS;
  public ROUTES = Constants.ROUTES;
  public LABELS = Constants.LABELS.PRINCIPAL;

  constructor(private breakpointObserver: BreakpointObserver) {}
}
