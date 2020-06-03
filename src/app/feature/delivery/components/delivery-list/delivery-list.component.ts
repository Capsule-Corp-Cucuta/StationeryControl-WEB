import { Component, OnInit } from '@angular/core';

import { Constants } from '../../../../shared/constants/global-constants';
import { DeliveryService } from '../../../../core/services/delivery.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent implements OnInit {
  public deliverys = [];

  public ICONS = Constants.ICONS;
  public ROUTES = Constants.ROUTES;
  public CELLS = Constants.LABELS.DELIVERY.LIST.CELLS;
  public TOOLTIP = Constants.LABELS.DELIVERY.LIST.TOOLTIP;
  public COLUMNS = Constants.LABELS.DELIVERY.LIST.COLUMNS;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.loadDeliverys();
  }

  public loadDeliverys() {
    this.deliveryService.findAll(0).subscribe(
      (resp) => {
        this.deliverys = resp;
      },
      (err) => {
        // TODO
        alert(err.error.message);
      }
    );
  }
}
