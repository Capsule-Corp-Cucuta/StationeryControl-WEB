import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'src/app/core/models/user.model';
import { Constants } from '../../constants/global-constants';
import { FacadeService } from 'src/app/core/services/facade.service';

@Component({
  selector: 'app-certificates-filter',
  templateUrl: './certificates-filter.component.html',
  styleUrls: ['./certificates-filter.component.scss'],
})
export class CertificatesFilterComponent implements OnInit {
  public values: any;

  public readonly ICON = Constants.ICONS;
  public readonly TOWNSHIPS = Constants.TOWNSHIPS;
  public readonly TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public readonly STATES = Constants.CERTIFICATES_STATES_MAPPER;
  public readonly LABELS = Constants.LABELS.CERTIFICATE.FILTER.LABELS;
  public readonly BUTTON = Constants.LABELS.CERTIFICATE.FILTER.BUTTON;
  public readonly PLACEHOLDER = Constants.LABELS.CERTIFICATE.FILTER.PLACEHOLDER;

  @Input() filter: string;
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
    this.setIdentificationCard(user);
    return user && user.name ? user.name : '';
  };

  private setIdentificationCard(user: User) {
    if (user && user.identificationCard) {
      this.values.firstInput = user.identificationCard;
    }
  }

  public displayFnS = (user) => {
    this.setIdentificationCardS(user);
    return user && user.name ? user.name : '';
  };

  private setIdentificationCardS(user: User) {
    if (user && user.identificationCard) {
      this.values.secondInput = user.identificationCard;
    }
  }

  public findUserByName(e) {
    if (e !== '') {
      this.service.findByUserName(e, 0).subscribe((resp) => {
        this.users = resp as any[];
      });
    }
  }
}
