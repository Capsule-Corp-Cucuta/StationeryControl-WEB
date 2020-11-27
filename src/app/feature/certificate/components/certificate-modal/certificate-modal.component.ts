import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-certificate-modal',
  template: '<iframe [src]="link | urls" width="400" height="550" style="border: none;"></iframe>',
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
