import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constants } from 'src/app/shared/constants/global-constants';
import { Institution } from 'src/app/core/models/institution.model';
import { FacadeService } from 'src/app/core/services/facade.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../../core/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-institution-form',
  templateUrl: './institution-form.component.html',
  styleUrls: ['../../../../shared/styles/form.component.scss'],
})
export class InstitutionFormComponent implements OnInit {

  public form: FormGroup;
  public values;
  public attendant: string;
  public users: any[];
  public TOWNSHIPS: string[];
  public ICONS = Constants.ICONS;
  public LABELS = Constants.LABELS.INSTITUTION.FORM;
  public LABELSFILTER = Constants.LABELS.INSTITUTION.FILTER.LABELS;
  public PLACEHOLDER = Constants.LABELS.INSTITUTION.FILTER.PLACEHOLDER;
  public BUTTON = Constants.LABELS.INSTITUTION.FILTER.BUTTON;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private service: FacadeService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.listTownships();
  }

  private buildForm() {
    this.form = this.builder.group({
      township: ['', [Validators.required]],
      name: ['', [Validators.required]],
      attendant: ['',[Validators.required]]
    });
  }

  public create(e: Event) {
    e.preventDefault();

    if (this.form.valid) {
      const institution = this.form.value;
      institution.attendant = this.attendant;
      
      this.service.createInstitution(institution).subscribe(
        (resp) => {
          Swal.fire(
            'Exito',
            'Institucion registrada.',
            'success'
          );
          this.router.navigate(['./institucion/lista']);
        },
        (err) => {
          this.handlerError(err);
        }
      );
    }
  }

  public displayFn = (user) => {
    this.setId(user);
    return user && user.name ? user.name : '';
  }

  private setId(user: User) {
    if (user && user.id) {
      this.attendant = user.id;
    }
  }

  public findUserByName(e) {
    if (e !== '') {
      this.service.findUserByUserName(e, 0).subscribe((resp) => {
        this.users = resp as any[];
      });
    }
  }

  public handlerError(err): void {
    if (err.status === 404) {
      Swal.fire(
        'Oops...!',
        'Error al registrar la institucion.',
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
  }



