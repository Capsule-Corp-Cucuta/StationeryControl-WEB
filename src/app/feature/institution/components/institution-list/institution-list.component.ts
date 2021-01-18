import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Constants } from 'src/app/shared/constants/global-constants';
import { Institution } from 'src/app/core/models/institution.model';
import { FacadeService } from 'src/app/core/services/facade.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['../../../../shared/styles/list.component.scss'],
})
export class InstitutionListComponent implements OnInit {
  public pages = 0;
  public values;
  public filter: string;
  public authority: string;
  public institutions: Institution[] = [];
  public isWithFilter = false;
  public eventValue: any = null;
  public TOWNSHIPS: string[];
  private subscriptions: Subscription[] = [];
  public readonly SELECT = Constants.LABELS.INSTITUTION.FILTER.SELECT;
  public readonly FILTERS = Constants.FILTERSINSTITUTIONS;
  public readonly ICONS = Constants.ICONS;
  public readonly  CELLS = Constants.LABELS.INSTITUTION.LIST.CELLS;
  public readonly  COLUMNS = Constants.LABELS.INSTITUTION.LIST.COLUMNS;
  public readonly TOOLTIP = Constants.LABELS.INSTITUTION.LIST.TOOLTIP;
  public readonly ROUTES = Constants.ROUTES;

  constructor(
    private router: Router,
    private service: FacadeService
  ) {}

  ngOnInit(): void {
    this.authority = this.service.getAuthorities()[0];
    this.loadData();
    this.updateFilter('default');
    this.listTownships();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public delete(institution: Institution) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'No podrás recuperar esta Institucion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.service.deleteInstitution(institution).subscribe(() => {
          Swal.fire(
            'Eliminada!',
            'Institucion Eliminada.',
            'success'
          );
          //this.router.navigate(['./institucion/lista']);
          this.loadData();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  public loadInstitutions() {
    this.service.findAllInstitutions().subscribe(
      (resp) => {
        this.institutions = resp;
      },
      (err) => {
        this.handlerError(err);
      }
    );
  }

  private loadData(): void {
    if (!this.isWithFilter) {
     this.loadAdminInstitutions();
    }else{
      this.findByFilter(this.eventValue);
    }
  }

  public loadAdminInstitutions(): void {
    const subscription = this.service
    .countInstitutions()
    .pipe(
      finalize(() => {
        this.getIntitutions();
      })
    )
    .subscribe((resp) => {
      this.pages = Math.ceil(Number(resp) / 25);
    });
    this.subscriptions.push(subscription);
  }

  public getIntitutions() {
    const subscription = this.service.findAllInstitutions().subscribe((resp) => {
      this.institutions = resp;
    });
    this.subscriptions.push(subscription);
  }

  public updateFilter(filter: string): void {   
    switch (filter) {
      case this.FILTERS[0].value:
        this.filter = 'byName';
        break;
      case this.FILTERS[1].value:
        this.filter = 'byTownship';
        break;
      default:
        this.filter = 'byName';
        break;
    } 
  }

  public receiveEvent(e: any): void {
    this.eventValue = e;
    this.isWithFilter = true;
    this.loadData();
  }

  private findByFilter(e: any): void {  
    console.log(this.filter);
    switch (this.filter) {
      case 'byTownship':
        this.service.findInstitutionsByTownship(e.firstInput).subscribe(
          (response) => {
            this.institutions = [];
            this.institutions = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
      case 'byName':
        this.service.findInstitutionsByName(e.firstInput).subscribe(
          (response) => {
            this.institutions = response;
          },
          (err) => {
            this.handlerError(err);
          }
        );
        break;
    }
  }

  private listTownships(): void {
    this.service.findAllTownships().subscribe(
      (response) => {
        this.TOWNSHIPS = response; 
      },
      (error: HttpErrorResponse) => {
        // TODO
      }
    );
  }

  public handlerError(err): void {
    if (err.status === 404) {
      Swal.fire(
        'Oops...!',
        'No hay registro de instituciones',
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
