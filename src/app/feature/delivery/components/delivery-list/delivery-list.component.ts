import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FacadeService } from '../../../../core/services/facade.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { Constants } from '../../../../shared/constants/global-constants';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
  private subscriptions: Subscription[] = [];

  public readonly ICONS = Constants.ICONS;
  public readonly ROUTES = Constants.ROUTES;
  public readonly FILTERS = Constants.FILTERSDELIVERYS;
  public readonly CELLS = Constants.LABELS.DELIVERY.LIST.CELLS;
  public readonly TOOLTIP = Constants.LABELS.DELIVERY.LIST.TOOLTIP;
  public readonly COLUMNS = Constants.LABELS.DELIVERY.LIST.COLUMNS;
  public readonly SELECT = Constants.LABELS.DELIVERY.FILTER.SELECT;

  constructor(private router: Router, private service: FacadeService, private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.authority = this.service.getAuthorities()[0];
    this.loadDeliveries('0');
    this.updateFilter('default');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public loadDeliveries(page: string): void {
    if (!this.isWithFilter) {
      if (this.authority === 'ADMIN') {
        this.loadAdminData(Number(page));
      } else {
        this.loadDataByUser(this.service.getUser(), Number(page));
      }
    } else {
      this.findByFilter(this.eventValue, Number(page));
    }
  }

  private loadAdminData(page: number): void {
    const subscription = this.service
      .countDeliveries()
      .pipe(
        finalize(() => {
          this.findDeliverysAdmin(page);
        })
      )
      .subscribe((response) => {
        this.pages = Math.ceil(Number(response) / 25);
      });
    this.subscriptions.push(subscription);
  }

  private loadDataByUser(user: string, page: number): void {
    const subscription = this.service
      .countDeliveriesByAttendant(user)
      .pipe(
        finalize(() => {
          this.findDeliverysByUser(user, page);
        })
      )
      .subscribe((response) => {
        this.pages = Math.ceil(Number(response) / 25);
      });
    this.subscriptions.push(subscription);
  }

  public findDeliverysAdmin(page: number): void {
    const subscription = this.service.findAllDeliveries(0).subscribe(
      (resp) => {
        this.deliverys = resp;
      },
      (err) => {
        this.handlerError(err);
      }
    );
    this.subscriptions.push(subscription);
  }

  public findDeliverysByUser(user: string, page: number) {
    const subscription = this.service.findDeliveriesByAttendant(user, page).subscribe(
      (resp) => {
        this.deliverys = resp;
      },
      (err) => {
        this.handlerError(err);
      }
    );
    this.subscriptions.push(subscription);
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
        this.service.findDeliveriesByTypeAndUser(e.firstInput, e.secondInput, page).subscribe(
          (response) => { 
            this.deliverys = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byUser':
        this.service.findDeliveriesByUser(e.firstInput, page).subscribe(
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
    if (err.status === 404) {
        Swal.fire(
          'Oops...!',
          'No hay registros de  entregas y/o devoluciones.',
          'error'
        );
     } else if (err.status === 500) {
       Swal.fire(
         'ERROR 500 !',
         'INTERNAL, SERVER ERROR.',
         'error'
       );
       //this.router.navigate(['/server-error']);
     }else {
       Swal.fire(
         'Oops...!',
         'ah ocurrido un error, intenta mas tarde.',
         'error'
       );
     }
   }
}
