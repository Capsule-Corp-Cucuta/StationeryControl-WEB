import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Historical } from 'src/app/core/models/historical.model';
import { Constants } from 'src/app/shared/constants/global-constants';

@Component({
  selector: 'app-certificate-modal-historical',
  templateUrl: './certificate-modal-historical.component.html',
  styleUrls: ['../../../../shared/styles/list.component.scss']
})
export class CertificateModalHistoricalComponent implements OnInit {
  public id:number;
  public historical: Historical[] = [];
  public readonly  CELLS = Constants.LABELS.HISTORICAL.LIST.CELLS;
  public readonly  COLUMNS = Constants.LABELS.HISTORICAL.LIST.COLUMNS;
  public readonly ICONS = Constants.ICONS;
  public readonly LABELS = Constants.LABELS.HISTORICAL.TITLE;
  
  constructor(
    public dialogRef: MatDialogRef<CertificateModalHistoricalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    this.id = this.data;
    this.loadHistorical(this.id);
  }

  private loadHistorical(id:number){
      console.log(id);
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
