import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../../core/services/user.service';
import { Constants } from '../../../../shared/constants/global-constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users = [];

  public ICONS = Constants.ICONS;
  public ROUTES = Constants.ROUTES;
  public CELLS = Constants.LABELS.USER.LIST.CELLS;
  public COLUMNS = Constants.LABELS.USER.LIST.COLUMNS;

  constructor(private service: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  public loadUsers() {
    this.service.findAll(0).subscribe(
      (resp) => {
        this.users = resp;
      },
      (err) => {
        // TODO
        alert(err.error.message);
      }
    );
  }
}
