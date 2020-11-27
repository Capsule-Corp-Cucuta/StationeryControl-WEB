import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Constants } from '../../constants/global-constants';
import { FacadeService } from '../../../core/services/facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public authority: string;
  public id: string;

  public readonly ICONS = Constants.ICONS;
  public readonly LINKS = Constants.LINKS;
  public readonly ROUTES = Constants.ROUTES;
  public readonly LABELS = Constants.LABELS.PRINCIPAL;

  constructor(private service: FacadeService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.service.getUser();
    this.authority = this.service.getAuthorities()[0];
  }

  public logOut(): void {
    this.service.logOut();
    this.router.navigate([this.ROUTES.SECURITY]);
  }
}
