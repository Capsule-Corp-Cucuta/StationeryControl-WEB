import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../../core/services/user.service';
import { Constants } from '../../../../shared/constants/global-constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  constructor(private service: UserService, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  public loadUsers() {
    this.service.findAll(0).subscribe(
      (resp) => {
        this.users = resp;
      },
      (err) => {
        
        if (err.status === 400) {
          this._snackBar.open('Peticion erronea, Por favor modificarla', 'ERROR', {
            duration: 3000,
          });
        } else if (err.status === 401) {
          this._snackBar.open('Peticion carece de credenciales válidas de autenticación', 'ERROR', {
            duration: 3000,
          });
        } else if (err.status === 403) {
          this._snackBar.open('Peticion Prohibida', 'ERROR', {
            duration: 3000,
          });
        } else if (err.status === 404) {
          this._snackBar.open('No hay Usuarios registrados', 'OK', {
            duration: 3000,
          });
        } else if (err.status === 500) {
          this.router.navigate(['/server-error']);
        }
      }
    );
  }
}
