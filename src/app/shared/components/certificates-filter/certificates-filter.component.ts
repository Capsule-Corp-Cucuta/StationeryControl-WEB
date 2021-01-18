import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'src/app/core/models/user.model';
import { Constants } from '../../constants/global-constants';
import { FacadeService } from 'src/app/core/services/facade.service';

@Component({
  selector: 'app-certificates-filter',
  templateUrl: './certificates-filter.component.html',
  styleUrls: ['../../styles/filter.component.scss'],
})
export class CertificatesFilterComponent implements OnInit {
  public values: any;

  public readonly ICON = Constants.ICONS;
  public readonly TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public readonly STATES = Constants.CERTIFICATES_STATES_MAPPER;
  public readonly LABELS = Constants.LABELS.CERTIFICATE.FILTER.LABELS;
  public readonly BUTTON = Constants.LABELS.CERTIFICATE.FILTER.BUTTON;
  public readonly PLACEHOLDER = Constants.LABELS.CERTIFICATE.FILTER.PLACEHOLDER;

  @Input() filter: string;
  @Input() TOWNSHIPS: string[];
  @Output() filterEvent = new EventEmitter();

  public users: any[];
  myControl = new FormControl();
  constructor(private service: FacadeService) {
    this.values = {
      firstInput: '',
      secondInput: '',
    };
  }

  ngOnInit(): void {}

  public sendEvent(): void {
    this.filterEvent.emit(this.values);
  }

  public displayFn = (user) => {
    this.setId(user);
    return user && user.name ? user.name : '';
  }

  private setId(user: User) {
    if (user && user.id) {
      this.values.firstInput = user.id;
    }
  }

  public displayFnS = (user) => {
    this.setIds(user);
    return user && user.name ? user.name : '';
  };

  private setIds(user: User) {
    if (user && user.id) {
      this.values.secondInput = user.id;
    }
  }

  public findUserByName(e) {
    if (e !== '') {
      this.service.findUserByUserName(e, 0).subscribe((resp) => {
        this.users = resp as any[];
      });
    }
  }
}
