import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../../../core/services/delivery.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent implements OnInit {
  public deliverys = [];
  public displayedColumns: string[] = [
    'tradeNumber',
    'deliveryType',
    'firstCertificate',
    'lastCertificate',
    'sender',
    'receiver',
    'actions',
  ];

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
