import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';
import { CertificateService } from '../../../../core/services/certificate.service';
import { CertificateModalComponent } from '../certificate-modal/certificate-modal.component';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
})
export class CertificateListComponent implements OnInit {
  public page = 0;
  public certificates = [];
  public filter: string;
  public authority: string;
  public userSesiom = true;
  public isWithFilter = false;
  public eventValue: any = null;

  public readonly ICONS = Constants.ICONS;
  public readonly ROUTES = Constants.ROUTES;
  public readonly FILTERS = Constants.FILTERSCERTIFICATES;
  public readonly TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public readonly STATES = Constants.CERTIFICATES_STATES_MAPPER;
  public readonly CELLS = Constants.LABELS.CERTIFICATE.LIST.CELLS;
  public readonly TOOLTIP = Constants.LABELS.CERTIFICATE.LIST.TOOLTIP;
  public readonly COLUMNS = Constants.LABELS.CERTIFICATE.LIST.COLUMNS;
  public readonly SELECT = Constants.LABELS.CERTIFICATE.FILTER.SELECT;

  constructor(
    private certificateService: CertificateService,
    public dialog: MatDialog,
    private router: Router,
    private service: FacadeService
  ) {}

  ngOnInit(): void {
    this.authority = this.service.getAuthorities()[0];
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
        this.findCertificatesByUser(this.service.getUser(), page);
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

  public openDialog(certificate: string): void {
    const certificateNumber = Number(certificate);
    if (certificate) {
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
