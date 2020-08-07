import { Component, OnInit } from '@angular/core';
import { Constants } from '../../constants/global-constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public LABELS = Constants.LABELS.FOOTER;
  constructor() {}

  ngOnInit(): void {}
}
