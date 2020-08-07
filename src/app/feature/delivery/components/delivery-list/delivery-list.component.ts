import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from '../../../../shared/constants/global-constants';
import { DeliveryService } from '../../../../core/services/delivery.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent implements OnInit {
  public deliverys = [];
  public filter: string;

  public isWithFilter: boolean = false;
  public eventValue: any = null;
  public ICONS = Constants.ICONS;
  public ROUTES = Constants.ROUTES;
  public CELLS = Constants.LABELS.DELIVERY.LIST.CELLS;
  public TOOLTIP = Constants.LABELS.DELIVERY.LIST.TOOLTIP;
  public COLUMNS = Constants.LABELS.DELIVERY.LIST.COLUMNS;

  public FILTERS = Constants.FILTERSDELIVERYS;
  public SELECT = Constants.LABELS.DELIVERY.FILTER.SELECT;
  public authority: string;
  public page = 0;

  constructor(
    private deliveryService: DeliveryService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private sessionService: TokenService
  ) {}

  ngOnInit(): void {
    this.authority = this.sessionService.getAuthorities()[0];
    this.loadDeliverys(0);
    this.updateFilter('default');
  }

  public loadDeliverys(page: number) {
    if (!this.isWithFilter) {
      if (this.authority === 'ADMIN') {
        this.findDeliverysAdmin(page);
      } else {
        this.findDeliverysByUser(this.sessionService.getUser(), page);
      }
    } else {
      this.findByFilter(this.eventValue, page);
    }
  }

  public findDeliverysAdmin(page: number) {
    this.deliveryService.findAll(0).subscribe(
      (resp) => {
        this.deliverys = resp;
      },
      (err) => {
        this.handlerError(err);
      }
    );
  }

  public findDeliverysByUser(user: string, page: number) {
    this.deliveryService.findByAttendant(user, 0).subscribe(
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
    this.loadDeliverys(0);
  }

  private findByFilter(e: any, page: number): void {
    switch (this.filter) {
      case 'byTradeNumber':
        this.deliveryService.findByTradeNumber(e.firstInput).subscribe(
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
        this.deliveryService.findByDate(e.firstInput, page).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'betweenDates':
        this.deliveryService.findByBetweenDate(e.firstInput, e.secondInput, page).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byType':
        this.deliveryService.findByType(e.firstInput, page).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byTypeUser':
        this.deliveryService.findByTypeUser(e.firstInputm, e.secondInput, page).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byUser':
        this.deliveryService.findByUser(e.firstInputm, page).subscribe(
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
      this._snackBar.open('Peticion erronea, Por favor modificarla', 'ERROR', {
        duration: 3000,
      });
    } else if (err.status === 401) {
      this._snackBar.open('Peticion carece de credenciales válidas de autenticación', 'ERROR', {
        duration: 3000,
      });
    } else if (err.status === 403) {
      this._snackBar.open('Peticion Prohibida', 'ERROR', {
        duration: 3000,
      });
    } else if (err.status === 404) {
      this._snackBar.open('No hay registros', 'OK', {
        duration: 3000,
      });
    } else if (err.status === 500) {
      this.router.navigate(['/server-error']);
    }
  }

  public paginator(page: string) {
    console.log(this.filter);
    if (page === 'next') {
      this.page++;
      console.log(this.page);
      this.loadDeliverys(this.page);
    } else {
      this.page--;
      console.log(this.page);
      this.loadDeliverys(this.page);
    }
  }
}