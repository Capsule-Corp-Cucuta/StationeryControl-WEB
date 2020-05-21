import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-certificado-modal',
  templateUrl: './certificado-modal.component.html',
  styleUrls: ['./certificado-modal.component.scss'],
})
export class CertificadoModalComponent implements OnInit {
  public link: string;
  constructor(
    public dialogRef: MatDialogRef<CertificadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.link = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
