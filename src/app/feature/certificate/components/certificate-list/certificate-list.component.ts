import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';
import { CertificateModalComponent } from '../certificate-modal/certificate-modal.component';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['../../../../shared/styles/list.component.scss'],
})
export class CertificateListComponent implements OnInit, OnDestroy {
  public pages = 0;
  public certificates = [];
  public filter: string;
  public authority: string;
  public userSesiom = true;
  public isWithFilter = false;
  public eventValue: any = null;
  public TOWNSHIPS: string[];

  public readonly ICONS = Constants.ICONS;
  public readonly ROUTES = Constants.ROUTES;
  public readonly FILTERS = Constants.FILTERSCERTIFICATES;
  public readonly TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public readonly STATES = Constants.CERTIFICATES_STATES_MAPPER;
  public readonly CELLS = Constants.LABELS.CERTIFICATE.LIST.CELLS;
  public readonly TOOLTIP = Constants.LABELS.CERTIFICATE.LIST.TOOLTIP;
  public readonly COLUMNS = Constants.LABELS.CERTIFICATE.LIST.COLUMNS;
  public readonly SELECT = Constants.LABELS.CERTIFICATE.FILTER.SELECT;

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: FacadeService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.authority = this.service.getAuthorities()[0];
    this.loadCerticates('0');
    this.updateFilter('default');
    if (this.authority === 'USER') {
      this.userSesiom = false;
    }
    this.listTownships();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public loadCerticates(page: string): void {
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
    const subscription = this.statisticsService
      .countAll()
      .pipe(
        finalize(() => {
          this.findCertificatesAdmin(page);
        })
      )
      .subscribe((response) => {
        this.pages = Math.ceil(Number(response) / 25);
      });
    this.subscriptions.push(subscription);
  }

  private loadDataByUser(user: string, page: number): void {
    const subscription = this.statisticsService
      .countByAttendant(user)
      .pipe(
        finalize(() => {
          this.findCertificatesByUser(user, page);
        })
      )
      .subscribe((response) => {
        this.pages = Math.ceil(Number(response) / 25);
      });
    this.subscriptions.push(subscription);
  }

  private findCertificatesAdmin(page: number): void {
    const subscription = this.service.findAllCertificates(page).subscribe(
      (resp) => {
        this.certificates = resp;  
      },
      (err) => {  
        this.handlerError(err);
      }
    );
    this.subscriptions.push(subscription);
  }

  private findCertificatesByUser(user: string, page: number): void {
    const subscriprion = this.service.findCertificatesByAttendant(user, page).subscribe(
      (resp) => {
        this.certificates = resp;
      },
      (err) => {
        this.handlerError(err);
      }
    );
    this.subscriptions.push(subscriprion);
  }

  public openDialog(certificate: string): void {
    const certificateNumber = Number(certificate);
    if (certificate) {
      this.service.findFileByCertificateId(certificateNumber).subscribe((resp) => {
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
    this.loadCerticates('0');
  }

  private findByFilter(e: any, page: number): void {
    switch (this.filter) {
      case 'byNumber':
        this.service.findCertificateByNumber(e.firstInput).subscribe(
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
        this.service.findCertificatesBetweenNumbers(e.firstInput, e.secondInput).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byType':
        this.service.findCertificatesByType(e.firstInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byTypeAttendant':
        this.service.findCertificatesByTypeAndAttendant(e.firstInput, e.secondInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byTypeInstitution':
        this.service.findCertificatesByTypeAndInstitution(e.firstInput, e.secondInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byState':
        this.service.findCertificatesByState(e.firstInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byStateAttendant':
        this.service.findCertificatesByStateAndAttendant(e.firstInput, e.secondInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byStateInstitution':
        this.service.findCertificatesByStateAndInstitution(e.firstInput, e.secondInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byAttendant':
        this.service.findCertificatesByAttendant(e.firstInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byTownship':
        this.service.findCertificatesByTwonship(e.firstInput, page).subscribe(
          (response) => {
            this.certificates = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byInstitution':
        this.service.findCertificatesByInstitution(e.firstInput, page).subscribe(
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
    if (err.status === 404) {
        Swal.fire(
          'Oops...!',
          'No hay registros de certificados.',
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

  private listTownships(): void {
    this.service.findAllTownships().subscribe(
      (response) => {
        this.TOWNSHIPS = response;
      },
      (error: HttpErrorResponse) => {
        // TODO
      }
    );
  }
}
