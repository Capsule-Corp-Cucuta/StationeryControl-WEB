import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'src/app/core/models/user.model';
import { Constants } from '../../constants/global-constants';
import { FacadeService } from 'src/app/core/services/facade.service';

@Component({
  selector: 'app-deliverys-filter',
  templateUrl: './deliverys-filter.component.html',
  styleUrls: ['../../styles/filter.component.scss'],
})
export class DeliverysFilterComponent implements OnInit {
  public values: any;
  public users: any[];
  public myControl = new FormControl();

  public readonly ICON = Constants.ICONS;
  public readonly TYPES = Constants.DELIVERIES_TYPES_MAPPER;
  public readonly LABELS = Constants.LABELS.DELIVERY.FILTER.LABELS;
  public readonly BUTTON = Constants.LABELS.DELIVERY.FILTER.BUTTON;
  public readonly PLACEHOLDER = Constants.LABELS.DELIVERY.FILTER.PLACEHOLDER;

  @Input() filter: string;
  @Output() filterEvent = new EventEmitter();

  constructor(private servce: FacadeService) {
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
  };

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
      this.servce.findUserByUserName(e, 0).subscribe((resp) => {
        this.users = resp as any[];
      });
    }
  }
}
