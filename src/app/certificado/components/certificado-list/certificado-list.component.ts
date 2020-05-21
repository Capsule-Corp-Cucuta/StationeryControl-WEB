import { Component, OnInit } from '@angular/core';
import { CertificadoService } from '../../../core/services/certificado.service';
import { MatDialog } from '@angular/material/dialog';
import { CertificadoModalComponent } from '../certificado-modal/certificado-modal.component';

@Component({
  selector: 'app-certificado-list',
  templateUrl: './certificado-list.component.html',
  styleUrls: ['./certificado-list.component.scss'],
})
export class CertificadoListComponent implements OnInit {
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

  constructor(private certicadoService: CertificadoService, public dialog: MatDialog) {}

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
    if (number) {
      this.certicadoService.findFileById(number).subscribe((resp) => {
        var file = new Blob([resp], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        //console.log(fileURL);
        const dialogRef = this.dialog.open(CertificadoModalComponent, {
          data: fileURL,
        });
      });
    }
  }
}
