import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User, UserType } from 'src/app/core/models/user.model';
import { Institution } from 'src/app/core/models/institution.model';
import { FacadeService } from 'src/app/core/services/facade.service';
import { Constants } from 'src/app/shared/constants/global-constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['../../../../shared/styles/form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  public user: User;
  public isCreate: boolean;
  public TOWNSHIPS: string[];
  public INSTITUTIONS: Institution[];

  public readonly ICONS = Constants.ICONS;
  public readonly DEPARTMENT = Constants.DEPARTMENT;
  public readonly LABELS = Constants.LABELS.USER.FORM;
  public readonly USER_TYPES = Constants.USER_TYPES_MAPPER;

  constructor(private builder: FormBuilder,private router: Router, private service: FacadeService, private activeRoute: ActivatedRoute) {
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
    this.buildForm();
    this.validateIsCreateForm();
    this.listTownships();
    this.listInstitutions(null);
  }

  public validateIsCreateForm() {
    this.activeRoute.params.subscribe((params: Params) => {
      const id = params.id;
      if (id) {
        this.isCreate = false;
        this.service.findUserByID(id).subscribe((response) => {
          this.user = response;
          this.form.patchValue(response);
        });
        this.validateInput(true);
      } else {
        this.isCreate = true;
      }
    });
  }

  private buildForm() {
    this.form = this.builder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      userType: [UserType.ADMINISTRATOR, [Validators.required]],
      department: [this.DEPARTMENT],
      township:[''],
      institution: ['']
    });
  }

  private validateInput(exito:Boolean){
    if(exito){
      this.form.controls['id'].disable();
    }else{
      this.form.controls['id'].enable();
    }
    
  }

  public create(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
    const user = this.form.value;
    this.service.createUser(user).subscribe((rep) => {
      Swal.fire(
        'Exito!',
        'Usuario Registrado.',
        'success'
      );
      this.router.navigate(['./usuario/lista']);
    },(err)=>{
     this.handlerError(err);
    });
  }
  }

  public update(e: Event) {
    e.preventDefault();
    this.validateInput(false);
    if (this.form.valid) {
    const user = this.form.value;
    this.service.updateUser(user).subscribe((resp) => {
      Swal.fire(
        'Exito!',
        'Usuario Actualizado.',
        'success'
      );
      this.router.navigate(['./usuario/lista']);
    },(err)=>{
      this.handlerError(err);
    });
    }
  }

  public delete(e: Event) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'No podrás recuperar este usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.service.deleteUser(this.user.id).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'Usuario Eliminado.',
            'success'
          );
          this.router.navigate(['./usuario/lista']);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
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

  public handlerError(err): void {
    if (err.status === 404) {
        Swal.fire(
          'Oops...!',
          'Error al registrar/actualizar usuario.',
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
