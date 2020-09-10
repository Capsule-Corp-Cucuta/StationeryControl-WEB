import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from '../../constants/global-constants';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-deliverys-filter',
  templateUrl: './deliverys-filter.component.html',
  styleUrls: ['./deliverys-filter.component.scss'],
})
export class DeliverysFilterComponent implements OnInit {
  @Input() filter: string;
  @Output() filterEvent = new EventEmitter();
  public values;
  public TYPES = Constants.DELIVERIES_TYPES_MAPPER;
  public LABELS = Constants.LABELS.DELIVERY.FILTER.LABELS;
  public PLACEHOLDER = Constants.LABELS.DELIVERY.FILTER.PLACEHOLDER;
  public BUTTON = Constants.LABELS.DELIVERY.FILTER.BUTTON;
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
      this.userService.findByUserName(e, 0).subscribe((resp) => {
        this.users = resp as any[];
      });
    }
  }
}
