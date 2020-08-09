import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Constants } from '../../../../shared/constants/global-constants';
import { CertificateService } from '../../../../core/services/certificate.service';
import { CertificateModalComponent } from '../certificate-modal/certificate-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
})
export class CertificateListComponent implements OnInit {
  public certificates = [];
  public filter: string;

  public isWithFilter: boolean = false;
  public eventValue: any = null;

  public ICONS = Constants.ICONS;
  public ROUTES = Constants.ROUTES;
  public CELLS = Constants.LABELS.CERTIFICATE.LIST.CELLS;
  public TOOLTIP = Constants.LABELS.CERTIFICATE.LIST.TOOLTIP;
  public COLUMNS = Constants.LABELS.CERTIFICATE.LIST.COLUMNS;

  public FILTERS = Constants.FILTERSCERTIFICATES;
  public authority: string;
  public TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public STATES = Constants.CERTIFICATES_STATES_MAPPER;
  public SELECT = Constants.LABELS.CERTIFICATE.FILTER.SELECT;
  public userSesiom = true;

  public page = 0;

  constructor(
    private certificateService: CertificateService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private sessionService: TokenService
  ) {}

  ngOnInit(): void {
    this.authority = this.sessionService.getAuthorities()[0];
    this.loadCerticates(0);
    this.updateFilter('default');
    if (this.authority === 'USER') {
      this.userSesiom = false;
    }
  }

  public loadCerticates(page: number) {
    if (!this.isWithFilter) {
      if (this.authority === 'ADMIN') {
        this.findCertificatesAdmin(page);
      } else {
        this.findCertificatesByUser(this.sessionService.getUser(), page);
      }
    } else {
      this.findByFilter(this.eventValue, page);
    }
  }

  private findCertificatesAdmin(page: number) {
    this.certificateService.findAll(page).subscribe(
      (resp) => {
        this.certificates = resp;
      },
      (err) => {
        this.handlerError(err);
      }
    );
  }

  private findCertificatesByUser(user: string, page: number) {
    this.certificateService.findByAttendant(user, page).subscribe(
      (resp) => {
        this.certificates = resp;
      },
      (err) => {
        this.handlerError(err);
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
        if (this.authority === 'ADMIN') {
          this.filter = 'byNumber';
        } else {
          this.filter = 'byTypeAttendant';
        }
        break;
    }
  }

  public receiveEvent(e: any): void {
    this.eventValue = e;
    this.isWithFilter = true;
    this.loadCerticates(0);
  }

  private findByFilter(e: any, page: number): void {
    switch (this.filter) {
      case 'byNumber':
        this.certificateService.findByNumber(e.firstInput).subscribe(
          (response) => {
            this.certificates = [];
            this.certificates.push(response);
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'betweenNumbers':
        this.certificateService.findBetweenNumbers(e.firstInput, e.secondInput).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byType':
        this.certificateService.findByType(e.firstInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byTypeAttendant':
        this.certificateService.findByTypeAttendant(e.firstInput, e.secondInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byTypeInstitution':
        this.certificateService.findByTypeInstitution(e.firstInput, e.secondInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byState':
        this.certificateService.findByState(e.firstInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byStateAttendant':
        this.certificateService.findByStateAttendant(e.firstInput, e.secondInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byStateInstitution':
        this.certificateService.findByStateInstitution(e.firstInput, e.secondInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byAttendant':
        this.certificateService.findByAttendant(e.firstInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byTownship':
        this.certificateService.findByTwonship(e.firstInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byInstitution':
        this.certificateService.findByInstitution(e.firstInput, page).subscribe(
          (response) => {
            this.certificates = response;
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
      this._snackBar.open('No hay Certificados registrados', 'OK', {
        duration: 3000,
      });
    } else if (err.status === 500) {
      this.router.navigate(['/server-error']);
    }
  }

  public paginator(page: string) {
    if (page === 'next') {
      this.page++;
      this.loadCerticates(this.page);
    } else {
      this.page--;
      this.loadCerticates(this.page);
    }
  }
}
