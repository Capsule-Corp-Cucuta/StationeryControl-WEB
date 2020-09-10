import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { Constants } from '../../../../shared/constants/global-constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  public pages: number;
  public users: User[] = [];

  public readonly ICONS = Constants.ICONS;
  public readonly ROUTES = Constants.ROUTES;
  public readonly CELLS = Constants.LABELS.USER.LIST.CELLS;
  public readonly COLUMNS = Constants.LABELS.USER.LIST.COLUMNS;

  private subscriptions: Subscription[] = [];

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private loadData() {
    const subscription = this.service
      .countUsers()
      .pipe(
        finalize(() => {
          this.getUsers('0');
        })
      )
      .subscribe((resp) => {
        this.pages = Math.ceil(Number(resp) / 25);
      });
    this.subscriptions.push(subscription);
  }

  public getUsers(page: string) {
    const subscription = this.service.findAll(Number(page)).subscribe((resp) => {
      this.users = resp;
    });
    this.subscriptions.push(subscription);
  }
}
