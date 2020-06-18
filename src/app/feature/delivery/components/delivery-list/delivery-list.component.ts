import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from '../../../../shared/constants/global-constants';
import { DeliveryService } from '../../../../core/services/delivery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent implements OnInit {
  public deliverys = [];
  public filter: string;
  public msn: string;
  public ICONS = Constants.ICONS;
  public ROUTES = Constants.ROUTES;
  public CELLS = Constants.LABELS.DELIVERY.LIST.CELLS;
  public TOOLTIP = Constants.LABELS.DELIVERY.LIST.TOOLTIP;
  public COLUMNS = Constants.LABELS.DELIVERY.LIST.COLUMNS;

  public FILTERS = Constants.FILTERSDELIVERYS;
  public SELECT = Constants.LABELS.DELIVERY.FILTER.SELECT;
  public authority = 'ADMIN';

  constructor(private deliveryService: DeliveryService, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadDeliverys();
    this.updateFilter('default');
  }

  public loadDeliverys() {
    if (true) {
      this.findDeliverysAdmin();
    } else {
      this.findDeliverysByUser('1090');
    }
  }

  public findDeliverysAdmin() {
    this.deliveryService.findAll(0).subscribe(
      (resp) => {
        this.deliverys = resp;
      },
      (err) => {
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
          this._snackBar.open('No hay entregas y devoluciones registradas', 'OK', {
            duration: 3000,
          });
        } else if (err.status === 500) {
          this.router.navigate(['/server-error']);
        }
      }
    );
  }

  public findDeliverysByUser(user: string) {
    this.deliveryService.findByAttendant(user, 0).subscribe(
      (resp) => {
        this.deliverys = resp;
      },
      (err) => {
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
          this._snackBar.open('No hay registros asignados para este usuario', 'OK', {
            duration: 3000,
          });
        } else if (err.status === 500) {
          this.router.navigate(['/server-error']);
        }
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
        this.filter = 'byTradeNumber';
        break;
    }
  }

  public receiveEvent(e: any): void {
    this.findByFilter(e);
  }

  private findByFilter(e: any): void {
    switch (this.filter) {
      case 'byTradeNumber':
        this.deliveryService.findByTradeNumber(e.firstInput).subscribe(
          (response) => {
            this.deliverys = [];
            this.deliverys.push(response);
          },
          (err) => {
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
              this._snackBar.open('No hay registros con ese Numero de Oficio', 'ERROR', {
                duration: 2000,
              });
            }
          }
        );
        break;
      case 'byDate':
        this.deliveryService.findByDate(e.firstInput, 0).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
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
              this._snackBar.open('No hay registros con esa Fecha', 'ERROR', {
                duration: 2000,
              });
            }
          }
        );
        break;
      case 'betweenDates':
        this.deliveryService.findByBetweenDate(e.firstInput, e.secondInput, 0).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
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
              this._snackBar.open('No hay registros entre las fechas ingresadas', 'ERROR', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byType':
        this.deliveryService.findByType(e.firstInput, 0).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
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
              this._snackBar.open('No hay registros con el tipo seleccionado', 'ERROR', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byTypeUser':
        this.deliveryService.findByTypeUser(e.firstInputm, e.secondInput, 0).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
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
              this._snackBar.open('No hay registros, seleccione otras opciones', 'ERROR', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byUser':
        this.deliveryService.findByUser(e.firstInputm, 0).subscribe(
          (response) => {
            this.deliverys = response;
          },
          (err) => {
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
              this._snackBar.open('No hay registros con ese usuario', 'ERROR', {
                duration: 3000,
              });
            }
          }
        );
        break;
    }
  }
}
