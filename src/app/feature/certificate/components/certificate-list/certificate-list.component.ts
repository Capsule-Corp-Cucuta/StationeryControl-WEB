import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Constants } from '../../../../shared/constants/global-constants';
import { CertificateService } from '../../../../core/services/certificate.service';
import { CertificateModalComponent } from '../certificate-modal/certificate-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
})
export class CertificateListComponent implements OnInit {
  public certificates = [];
  public filter: string;
  public ICONS = Constants.ICONS;
  public ROUTES = Constants.ROUTES;
  public CELLS = Constants.LABELS.CERTIFICATE.LIST.CELLS;
  public TOOLTIP = Constants.LABELS.CERTIFICATE.LIST.TOOLTIP;
  public COLUMNS = Constants.LABELS.CERTIFICATE.LIST.COLUMNS;

  public FILTERS = Constants.FILTERSCERTIFICATES;
  public authority = 'ADMIN';
  public TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public STATES = Constants.CERTIFICATES_STATES_MAPPER;
  public SELECT = Constants.LABELS.CERTIFICATE.FILTER.SELECT;

  constructor(
    private certificateService: CertificateService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCerticates();
    this.updateFilter('default');
  }

  public loadCerticates() {
    if (true) {
      this.findCertificatesAdmin();
    } else {
      this.findCertificatesByUser('1090');
    }
  }

  private findCertificatesAdmin() {
    this.certificateService.findAll(0).subscribe(
      (resp) => {
        this.certificates = resp;
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
          this._snackBar.open('No hay Certificados registrados', 'OK', {
            duration: 3000,
          });
        } else if (err.status === 500) {
          this.router.navigate(['/server-error']);
        }
      }
    );
  }

  private findCertificatesByUser(user: string) {
    this.certificateService.findByAttendant(user, 0).subscribe(
      (resp) => {
        this.certificates = resp;
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
          this._snackBar.open('No hay Certificados registrados para este Usuario', 'OK', {
            duration: 3000,
          });
        } else if (err.status === 500) {
          this.router.navigate(['/server-error']);
        }
      }
    );
  }

  public openDialog(number: string): void {
    const certificateNumber = Number(number);
    if (number) {
      this.certificateService.findFileById(certificateNumber).subscribe((resp) => {
        const file = new Blob([resp], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);

        this.dialog.open(CertificateModalComponent, {
          data: fileURL,
        });
      });
    }
  }

  public updateFilter(filter: string): void {
    switch (filter) {
      case this.FILTERS[0].value:
        this.filter = 'byNumber';
        break;
      case this.FILTERS[1].value:
        this.filter = 'betweenNumbers';
        break;
      case this.FILTERS[2].value:
        this.filter = 'byType';
        break;
      case this.FILTERS[3].value:
        this.filter = 'byTypeAttendant';
        break;
      case this.FILTERS[4].value:
        this.filter = 'byTypeInstitution';
        break;
      case this.FILTERS[5].value:
        this.filter = 'byState';
        break;
      case this.FILTERS[6].value:
        this.filter = 'byStateAttendant';
        break;
      case this.FILTERS[7].value:
        this.filter = 'byStateInstitution';
        break;
      case this.FILTERS[8].value:
        this.filter = 'byAttendant';
        break;
      case this.FILTERS[9].value:
        this.filter = 'byTownship';
        break;
      case this.FILTERS[10].value:
        this.filter = 'byInstitution';
        break;
      default:
        this.filter = 'byNumber';
        break;
    }
  }

  public receiveEvent(e: any): void {
    console.log(e);

    this.findByFilter(e);
  }

  private findByFilter(e: any): void {
    switch (this.filter) {
      case 'byNumber':
        this.certificateService.findByNumber(e.firstInput).subscribe(
          (response) => {
            this.certificates = [];
            this.certificates.push(response);
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
              this._snackBar.open('No hay certificados registrados con ese numero', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'betweenNumbers':
        this.certificateService.findBetweenNumbers(e.firstInput, e.secondInput).subscribe(
          (response) => {
            this.certificates = response;
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
              this._snackBar.open('No hay Certificados registrados entre el rango de numeros seleccionado', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byType':
        this.certificateService.findByType(e.firstInput, 0).subscribe(
          (response) => {
            this.certificates = response;
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
              this._snackBar.open('No hay Certificados registrados para  el tipo seleccionado', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byTypeAttendant':
        this.certificateService.findByTypeAttendant(e.firstInput, e.secondInput, 0).subscribe(
          (response) => {
            this.certificates = response;
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
              this._snackBar.open('No hay Certificados registrados para ese numero de Cedula', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byTypeInstitution':
        this.certificateService.findByTypeInstitution(e.firstInput, e.secondInput, 0).subscribe(
          (response) => {
            this.certificates = response;
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
              this._snackBar.open('No hay Certificados registrados para las opciones seleccionadas', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byState':
        this.certificateService.findByState(e.firstInput, 0).subscribe(
          (response) => {
            this.certificates = response;
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
              this._snackBar.open('No hay Certificados registrados con ese estado', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byStateAttendant':
        this.certificateService.findByStateAttendant(e.firstInput, e.secondInput, 0).subscribe(
          (response) => {
            this.certificates = response;
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
              this._snackBar.open('No hay Certificados registrados para las opciones seleccionadas', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byStateInstitution':
        this.certificateService.findByStateInstitution(e.firstInput, e.secondInput, 0).subscribe(
          (response) => {
            this.certificates = response;
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
              this._snackBar.open('No hay Certificados registrados para las opciones seleccionadas', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byAttendant':
        this.certificateService.findByAttendant(e.firstInput, 0).subscribe(
          (response) => {
            this.certificates = response;
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
              this._snackBar.open('No hay Certificados registrados para ese numero de Cedula', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byTownship':
        this.certificateService.findByTwonship(e.firstInput, 0).subscribe(
          (response) => {
            this.certificates = response;
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
              this._snackBar.open('No hay Certificados registrados para ese Municipio', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
      case 'byInstitution':
        this.certificateService.findByInstitution(e.firstInput, 0).subscribe(
          (response) => {
            this.certificates = response;
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
              this._snackBar.open('No hay Certificados registrados para esa Institucion', 'OK', {
                duration: 3000,
              });
            }
          }
        );
        break;
    }
  }
}
