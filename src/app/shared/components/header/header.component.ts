import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Constants } from '../../constants/global-constants';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public LINKS = Constants.LINKS;
  public ICONS = Constants.ICONS;
  public ROUTES = Constants.ROUTES;
  public LABELS = Constants.LABELS.PRINCIPAL;
  public authority: string;
  public identificationCard: string;

  constructor(private sesionService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.identificationCard = this.sesionService.getUser();
    this.authority = this.sesionService.getAuthorities()[0];
  }

  public logOut(): void {
    this.sesionService.logOut();
    this.router.navigate([this.ROUTES.SECURITY]);
  }
}
