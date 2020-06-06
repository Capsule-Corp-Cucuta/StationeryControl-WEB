import { Component, OnInit } from '@angular/core';
import { Constants } from '../../constants/global-constants';

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
  constructor() {}

  ngOnInit(): void {}
}
