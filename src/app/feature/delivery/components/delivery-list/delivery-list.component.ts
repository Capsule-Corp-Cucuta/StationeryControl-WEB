import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['../../../../shared/styles/list.component.scss'],
})
export class DeliveryListComponent implements OnInit {
  public pages = 0;
  public deliverys = [];
  public filter: string;
  public authority: string;
  public isWithFilter = false;
  public eventValue: any = null;

  public readonly ICONS = Constants.ICONS;
  public readonly ROUTES = Constants.ROUTES;
  public readonly FILTERS = Constants.FILTERSDELIVERYS;
  public readonly CELLS = Constants.LABELS.DELIVERY.LIST.CELLS;
  public readonly TOOLTIP = Constants.LABELS.DELIVERY.LIST.TOOLTIP;
  public readonly COLUMNS = Constants.LABELS.DELIVERY.LIST.COLUMNS;
  public readonly SELECT = Constants.LABELS.DELIVERY.FILTER.SELECT;

  constructor(private router: Router, private service: FacadeService) {}

  ngOnInit(): void {
    this.authority = this.service.getAuthorities()[0];
    this.loadDeliveries('0');
    this.updateFilter('default');
  }

  public loadDeliveries(page: string) {
    if (!this.isWithFilter) {
      if (this.authority === 'ADMIN') {
        this.findDeliverysAdmin(Number(page));
      } else {
        this.findDeliverysByUser(this.service.getUser(), Number(page));
      }
    } else {
      this.findByFilter(this.eventValue, Number(page));
    }
  }

  public findDeliverysAdmin(page: number) {
    this.service.findAllDeliveries(0).subscribe(
      (resp) => {
        this.deliverys = resp;
      },
      (err) => {
        this.handlerError(err);
      }
    );
  }

  public findDeliverysByUser(user: string, page: number) {
    this.service.findDeliveriesByAttendant(user, page).subscribe(
      (resp) => {
        this.deliverys = resp;
      },
      (err) => {
        this.handlerError(err);
      }
    );
  }

  public updateFilter(filter: string): void {
    switch (filter) {
      case this.FILTERS[0].value:
        this.filter = 'byTradeNumber';
        break;
      case this.FILTERS[1].value:
        this.filter = 'byDate';
        break;
      case this.FILTERS[2].value:
        this.filter = 'betweenDates';
        break;
      case this.FILTERS[3].value:
        this.filter = 'byType';
        break;
      case this.FILTERS[4].value:
        this.filter = 'byTypeUser';
        break;
      case this.FILTERS[5].value:
        this.filter = 'byUser';
        break;
      default:
        if (this.authority === 'ADMIN') {
          this.filter = 'byTradeNumber';
        } else {
          this.filter = 'byTypeUser';
        }

        break;
    }
  }

  public receiveEvent(e: any): void {
    this.eventValue = e;
    this.isWithFilter = true;
    this.loadDeliveries('0');
  }

  private findByFilter(e: any, page: number): void {
    switch (this.filter) {
      case 'byTradeNumber':
        this.service.findDeliveryByTradeNumber(e.firstInput).subscribe(
          (response) => {
            this.deliverys = [];
            this.deliverys.push(response);
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byDate':
        this.service.findDeliveriesByDate(e.firstInput, page).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'betweenDates':
        this.service.findDeliveriesByBetweenDate(e.firstInput, e.secondInput, page).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byType':
        this.service.findDeliveriesByType(e.firstInput, page).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byTypeUser':
        this.service.findDeliveriesByTypeAndUser(e.firstInputm, e.secondInput, page).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byUser':
        this.service.findDeliveriesByUser(e.firstInputm, page).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
    }
  }

  public handlerError(err): void {
    if (err.status === 400) {
      // TODO Message
    } else if (err.status === 401) {
      // TODO Message
    } else if (err.status === 403) {
      // TODO Message
    } else if (err.status === 404) {
      // TODO Message
    } else if (err.status === 500) {
      this.router.navigate(['/server-error']);
    }
  }
}
