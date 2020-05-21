import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../../core/services/delivery.service';

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
    console.log('entro');
    this.deliveryService.findAll(0).subscribe(
      (resp) => {
        console.log(resp);

        this.deliverys = resp;
        console.log(this.deliverys);
      },
      (err) => {
        // TODO
        alert(err.error.message);
      }
    );
  }
}
