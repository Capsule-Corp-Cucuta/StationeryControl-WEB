import { Component, Input, Output, OnInit, EventEmitter  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FacadeService } from 'src/app/core/services/facade.service';
import { Constants } from '../../constants/global-constants';

@Component({
  selector: 'app-institution-filter',
  templateUrl: './institution-filter.component.html',
  styleUrls: ['../../styles/filter.component.scss']
})
export class InstitutionFilterComponent implements OnInit {

  public values: any;
  public users: any[];
  myControl = new FormControl();
  @Input() filter: string;
  @Input() TOWNSHIPS: string[];
  @Output() filterEvent = new EventEmitter();

  public readonly ICON = Constants.ICONS;
  public readonly LABELS = Constants.LABELS.INSTITUTION.FILTER.LABELS;
  public readonly BUTTON = Constants.LABELS.INSTITUTION.FILTER.BUTTON;
  public readonly PLACEHOLDER = Constants.LABELS.INSTITUTION.FILTER.PLACEHOLDER;
  constructor(private service: FacadeService) { 
    this.values = {
      firstInput: '',
    };
  }

  ngOnInit(): void {    
  }

  public sendEvent(): void {
    this.filterEvent.emit(this.values);
  }

}
