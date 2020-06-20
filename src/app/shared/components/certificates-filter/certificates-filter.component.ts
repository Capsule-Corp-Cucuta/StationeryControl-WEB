import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from '../../constants/global-constants';
import { UserService } from '../../../core/services/user.service';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-certificates-filter',
  templateUrl: './certificates-filter.component.html',
  styleUrls: ['./certificates-filter.component.scss'],
})
export class CertificatesFilterComponent implements OnInit {
  @Input() filter: string;
  @Output() filterEvent = new EventEmitter();
  public values;

  public TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public STATES = Constants.CERTIFICATES_STATES_MAPPER;
  public TOWNSHIPS = Constants.TOWNSHIPS;
  public LABELS = Constants.LABELS.CERTIFICATE.FILTER.LABELS;
  public PLACEHOLDER = Constants.LABELS.CERTIFICATE.FILTER.PLACEHOLDER;
  public BUTTON = Constants.LABELS.CERTIFICATE.FILTER.BUTTON;
  public ICON = Constants.ICONS;

  public users: any[];
  myControl = new FormControl();
  constructor(private userService: UserService) {
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
    console.log(this.filter);

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
    console.log(e);
    if (e != '') {
      this.userService.findByUserName(e, 0).subscribe((resp) => {
        this.users = resp as any[];
      });
    }
  }
}
