import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users = [];
  public displayedColumns: string[] = ['identificationCard', 'name', 'email', 'phone', 'userType', 'actions'];

  constructor(private service: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }
  s;
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
