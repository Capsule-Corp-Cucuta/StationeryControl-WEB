import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Constants } from 'src/app/shared/constants/global-constants';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstitutionService } from 'src/app/core/services/institution.service';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})
export class InstitutionListComponent implements OnInit {
  public form: FormGroup;
  public formFile: FormGroup;
  public formFilter: FormGroup;
  public fileName: string;
  public values;
  public institutions = [];

  public ICONS = Constants.ICONS;
  public LABELS = Constants.LABELS.INSTITUTION.FORM;
  public CELLS = Constants.LABELS.INSTITUTION.LIST.CELLS;
  public COLUMNS = Constants.LABELS.INSTITUTION.LIST.COLUMNS;
  public TOOLTIP = Constants.LABELS.INSTITUTION.LIST.TOOLTIP;
  public LABELSFILTER = Constants.LABELS.INSTITUTION.FILTER.LABELS;
  public PLACEHOLDER = Constants.LABELS.INSTITUTION.FILTER.PLACEHOLDER;
  public BUTTON = Constants.LABELS.INSTITUTION.FILTER.BUTTON;
  constructor(
    private router: Router,
    private builder: FormBuilder,
    private _snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute,
    private institutionService: InstitutionService
  ) {
    this.values = '';
  }

  ngOnInit(): void {
    this.buildForm();
    this.buildFormFilter();
    this.loadInstitutions();
  }

  private buildForm() {
    this.form = this.builder.group({
      institution: ['', [Validators.required]],
    });
  }

  private buildFormFilter() {
    this.formFilter = this.builder.group({
      name: ['', [Validators.required]],
    });
  }

  public create(e: Event) {
    e.preventDefault();

    if (this.form.valid) {
      const institution = this.form.value;
      this.institutionService.create(institution).subscribe(
        (resp) => {
          this._snackBar.open('Se ha registrado correctamente la institucion', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./institucion/lista']);
        },
        (err) => {
          if (err.status === 404) {
            this._snackBar.open('Institucion ya existe', 'ERROR', {
              duration: 2000,
            });
          } else {
            this.handlerError(err);
          }
        }
      );
    }
  }

  public delete(name: string) {
    this.institutionService.delete(name).subscribe(
      (resp) => {
        this.router.navigate(['./institucion/lista']);
      },
      (err) => {
        if (err.status === 404) {
          this._snackBar.open('La institucion no existe', 'OK', {
            duration: 2000,
          });
        } else {
          this.handlerError(err);
        }
      }
    );
  }

  public loadInstitutions() {
    this.institutionService.findAll(0).subscribe(
      (resp) => {
        this.institutions = resp;
      },
      (err) => {
        this.handlerError(err);
      }
    );
  }

  public findUserByName() {
    const filter = this.formFilter.value['name'];
    this.institutionService.findByInstitutionName(filter, 0).subscribe((resp) => {
      this.institutions = resp as any[];
    });
  }

  public fileChangeExcel(event) {}

  public uploadFileExcel() {}

  public handlerError(err): void {
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
      this._snackBar.open('No hay instituciones registrados', 'OK', {
        duration: 3000,
      });
    } else if (err.status === 500) {
      this.router.navigate(['/server-error']);
    }
  }
}
