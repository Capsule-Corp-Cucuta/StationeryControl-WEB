import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Constants } from '../../../../shared/constants/global-constants';
import { CertificateService } from '../../../../core/services/certificate.service';
import { CertificateModalComponent } from '../certificate-modal/certificate-modal.component';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
})
export class CertificateListComponent implements OnInit {
  public certificates = [];

  public ICONS = Constants.ICONS;
  public ROUTES = Constants.ROUTES;
  public CELLS = Constants.LABELS.CERTIFICATE.LIST.CELLS;
  public TOOLTIP = Constants.LABELS.CERTIFICATE.LIST.TOOLTIP;
  public COLUMNS = Constants.LABELS.CERTIFICATE.LIST.COLUMNS;

  constructor(private certicadoService: CertificateService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCerticates();
  }

  public loadCerticates() {
    if (true) {
      this.findCertificatesAdmin();
    } else {
      this.findCertificatesByUser('1090');
    }
  }

  private findCertificatesAdmin() {
    this.certicadoService.findAll(0).subscribe(
      (resp) => {
        console.log(resp);
        this.certificates = resp;
      },
      (err) => {
        // TODO
        alert(err.error.message);
      }
    );
  }

  private findCertificatesByUser(user: string) {
    this.certicadoService.findByAttendant(user, 0).subscribe(
      (resp) => {
        console.log(resp);
        this.certificates = resp;
      },
      (err) => {
        // TODO
        alert(err.error.message);
      }
    );
  }

  openDialog(number: string): void {
    const certificateNumber = Number(number);
    if (number) {
      this.certicadoService.findFileById(certificateNumber).subscribe((resp) => {
        const file = new Blob([resp], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);

        this.dialog.open(CertificateModalComponent, {
          data: fileURL,
        });
      });
    }
  }
}
