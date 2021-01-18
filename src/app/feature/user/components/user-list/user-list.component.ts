import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../../../../core/models/user.model';
import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../../../shared/styles/list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  public pages: number;
  public users: User[] = [];
  public filter: string;
  public authority: string;
  public isWithFilter = false;
  public eventValue: any = null;

  public readonly SELECT = Constants.LABELS.USER.FILTER.SELECT;
  public readonly FILTERS = Constants.FILTERSUSERS;
  public readonly ICONS = Constants.ICONS;
  public readonly ROUTES = Constants.ROUTES;
  public readonly CELLS = Constants.LABELS.USER.LIST.CELLS;
  public readonly COLUMNS = Constants.LABELS.USER.LIST.COLUMNS;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private service: FacadeService) {}

  ngOnInit(): void {
    this.authority = this.service.getAuthorities()[0];
    this.loadData('0');
    this.updateFilter('default');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private loadData(page: string): void {
    if (!this.isWithFilter) {
     this.loadAdminUser(page);
    }else{
      this.findByFilter(this.eventValue, Number(page));
    }
  }

  public loadAdminUser(page: string): void {
    const subscription = this.service
    .countUsers()
    .pipe(
      finalize(() => {
        this.getUsers(page);
      })
    )
    .subscribe((resp) => {
      this.pages = Math.ceil(Number(resp) / 25);
    });
    this.subscriptions.push(subscription);
  }

  public getUsers(page: string) {
    const subscription = this.service.findAllUsers(Number(page)).subscribe((resp) => {
      this.users = resp;
    });
    this.subscriptions.push(subscription);
  }

  public updateFilter(filter: string): void {
    switch (filter) {
      case this.FILTERS[0].value:
        this.filter = 'byAttendant';
        break;
      case this.FILTERS[1].value:
        this.filter = 'byName';
        break;
      default:
        this.filter = 'byAttendant';
        break;
    } 
  }

  public receiveEvent(e: any): void {
    this.eventValue = e;
    this.isWithFilter = true;
    this.loadData('0');
  }

  private findByFilter(e: any, page: number): void {
    switch (this.filter) {
      case 'byAttendant':
        this.service.findUserByID(e.firstInput).subscribe(
          (response) => {
            this.users = [];
            this.users.push(response);
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byName':
        this.service.findUserByUserName(e.firstInput, page).subscribe(
          (response) => {
            this.users = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
    }
  }

  public handlerError(err): void {
   if (err.status === 404) {
      Swal.fire(
        'Oops...!',
        'No hay usuarios con esos datos',
        'error'
      );
    } else if (err.status === 500) {
      Swal.fire(
        'ERROR 500 !',
        'INTERNAL, SERVER ERROR.',
        'error'
      );
      //this.router.navigate(['/server-error']);
    }else {
      Swal.fire(
        'Oops...!',
        'ah ocurrido un error, intenta mas tarde.',
        'error'
      );
    }
  }
}
