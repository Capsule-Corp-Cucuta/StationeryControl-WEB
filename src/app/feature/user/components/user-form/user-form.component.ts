import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User, UserType } from 'src/app/core/models/user.model';
import { Institution } from 'src/app/core/models/institution.model';
import { FacadeService } from 'src/app/core/services/facade.service';
import { Constants } from 'src/app/shared/constants/global-constants';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['../../../../shared/styles/form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public user: User;
  public isCreate: boolean;
  public TOWNSHIPS: string[];
  public INSTITUTIONS: Institution[];

  public readonly ICONS = Constants.ICONS;
  public readonly DEPARTMENT = Constants.DEPARTMENT;
  public readonly LABELS = Constants.LABELS.USER.FORM;
  public readonly USER_TYPES = Constants.USER_TYPES_MAPPER;

  constructor(private router: Router, private service: FacadeService, private activeRoute: ActivatedRoute) {
    this.user = {
      id: null,
      name: null,
      email: null,
      phone: null,
      userType: UserType.IDS,
      department: this.DEPARTMENT,
      township: null,
      institution: null,
    };
  }

  ngOnInit() {
    this.validateIsCreateForm();
    this.listTownships();
    this.listInstitutions(null);
  }

  public validateIsCreateForm() {
    this.activeRoute.params.subscribe((params: Params) => {
      const id = params.id;
      if (id) {
        this.isCreate = false;
        this.service.findUserByID(id).subscribe((response: User) => {
          this.user = response;
        });
      } else {
        this.isCreate = true;
      }
    });
  }

  public create(e: Event) {
    this.user.department = Constants.DEPARTMENT;
    this.service.createUser(this.user).subscribe(() => {
      this.router.navigate(['./usuario/lista']);
    });
  }

  public update(e: Event) {
    this.user.department = Constants.DEPARTMENT;
    this.service.updateUser(this.user).subscribe(() => {
      this.router.navigate(['./usuario/lista']);
    });
  }

  public delete(e: Event) {
    this.service.deleteUser(this.user.id).subscribe(() => {
      this.router.navigate(['./usuario/lista']);
    });
  }

  public listInstitutions(township: string): void {
    this.INSTITUTIONS = [];
    if (Boolean(township)) {
      this.service.findInstitutionsByTownship(township).subscribe((response: Institution[]) => {
        this.INSTITUTIONS = response;
      });
    } else {
      this.service.findAllInstitutions().subscribe((response: Institution[]) => {
        this.INSTITUTIONS = response;
      });
    }
  }

  private listTownships(): void {
    this.TOWNSHIPS = [];
    this.service.findAllTownships().subscribe(
      (response) => {
        this.TOWNSHIPS = response;
      },
      (error: HttpErrorResponse) => {}
    );
  }
}
