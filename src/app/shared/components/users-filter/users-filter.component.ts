import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { FacadeService } from 'src/app/core/services/facade.service';
import { Constants } from '../../constants/global-constants';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['../../styles/filter.component.scss'],
})
export class UsersFilterComponent implements OnInit {
  public values: any;
  public users: any[];
  myControl = new FormControl();
  @Input() filter: string;
  @Output() filterEvent = new EventEmitter();

  public readonly ICON = Constants.ICONS;
  public readonly LABELS = Constants.LABELS.USER.FILTER.LABELS;
  public readonly BUTTON = Constants.LABELS.USER.FILTER.BUTTON;
  public readonly PLACEHOLDER = Constants.LABELS.USER.FILTER.PLACEHOLDER;
  constructor(private service: FacadeService) {
    this.values = {
      firstInput: '',
    };
  }

  ngOnInit(): void {}

  public sendEvent(): void {
    console.log(this.filter);
    
    this.filterEvent.emit(this.values);
  }

  public displayFn = (user) => {
    this.setId(user);
    return user && user.name ? user.name : '';
  }

  private setId(user: User) {
    if (user && user.id) {
      this.values.firstInput = user.name;
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
