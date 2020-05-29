import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-certificate-modal',
  templateUrl: './certificate-modal.component.html',
  styleUrls: ['./certificate-modal.component.scss'],
})
export class CertificateModalComponent implements OnInit {
  public link: string;
  constructor(
    public dialogRef: MatDialogRef<CertificateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.link = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
