import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CertificateService } from '../../../../core/services/certificate.service';
import { CertificateModalComponent } from '../certificate-modal/certificate-modal.component';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss'],
})
export class CertificateListComponent implements OnInit {
  public certificates = [];
  public displayedColumns: string[] = [
    'number',
    'type',
    'state',
    'stateDate',
    'department',
    'township',
    'institution',
    'actions',
  ];

  constructor(private certicadoService: CertificateService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCerticates();
  }

  public loadCerticates() {
    this.certicadoService.findAll(0).subscribe(
      (resp) => {
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
