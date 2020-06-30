import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Constants } from '../../../../shared/constants/global-constants';
import { CertificateService } from '../../../../core/services/certificate.service';
import { CertificateState, CertificateType } from '../../../../core/models/certificate.model';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-certificate-form',
  templateUrl: './certificate-form.component.html',
  styleUrls: ['./certificate-form.component.scss'],
})
export class CertificateFormComponent implements OnInit {
  public form: FormGroup;
  public formFile: FormGroup;
  public isCreate = true;
  public showUploadAttachment = true;
  public fileName: string;
  public user: string;
  public authority: string;
  public userSesiom = false;

  public ICONS = Constants.ICONS;
  public TOWNSHIPS = Constants.TOWNSHIPS;
  public DEPARTMENT = Constants.DEPARTMENT;
  public LABELS = Constants.LABELS.CERTIFICATE.FORM;
  public TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public STATES = Constants.CERTIFICATES_STATES_MAPPER;

  private certificateNumber: number;
  private attachmentFormData: FormData;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private _snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute,
    private certificadoService: CertificateService,
    private sessionService: TokenService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.validateExistentCertificate();
    this.user = this.sessionService.getUser();
    this.authority = this.sessionService.getAuthorities()[0];
    if (this.authority === 'USER') {
      this.userSesiom = true;
    }
  }

  private validateExistentCertificate(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.certificateNumber = params.number;
      if (this.certificateNumber) {
        this.isCreate = false;
        this.certificadoService.findByID(this.certificateNumber).subscribe((resp) => {
          if (
            resp.state === CertificateState.IDLE ||
            resp.state === CertificateState.ASSIGNED ||
            resp.state === CertificateState.GUARDED
          ) {
            this.showUploadAttachment = false;
          }

          this.form.patchValue(resp);
        });
      } else {
        this.showUploadAttachment = false;
        this.buildFormFile();
      }
    });
  }

  private buildForm() {
    this.form = this.builder.group({
      attendant: [''],
      department: [this.DEPARTMENT],
      institution: ['', [Validators.required]],
      number: ['', [Validators.required]],
      state: [CertificateState.IDLE, [Validators.required]],
      township: ['', [Validators.required]],
      type: [CertificateType.CA_NV, [Validators.required]],
      verificationCode: ['', [Validators.required]],
    });
  }

  private buildFormFile() {
    this.formFile = this.builder.group({
      attachment: [''],
    });
  }

  public create(e: Event) {
    console.log(e);

    e.preventDefault();

    if (this.form.valid) {
      console.log(this.form.value);
      const certificate = this.form.value;
      certificate.attendant = this.user;
      this.certificadoService.create(certificate).subscribe(
        (resp) => {
          this._snackBar.open('Registro Exitoso', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./certificado/lista']);
        },
        (err) => {
          this.handlerError(err);
        }
      );
    }
  }

  public update(e: Event) {
    e.preventDefault();

    if (this.form.valid) {
      const certificate = this.form.value;
      console.log(certificate);

      this.certificadoService.update(certificate.number, certificate).subscribe(
        (resp) => {
          this._snackBar.open('Certificado Actualizado', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./certificado/lista']);
        },
        (err) => {
          this.handlerError(err);
        }
      );
    }
  }

  public uploadFile() {
    this.certificadoService.postFile(this.certificateNumber, this.attachmentFormData).subscribe((resp) => {
      this._snackBar.open('Archivo subido', 'OK', {
        duration: 2000,
      });
    });
  }

  public fileChange(event) {
    this.fileName = event.target.files[0].name;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.attachmentFormData = new FormData();
      this.attachmentFormData.append('file', file);
      this.attachmentFormData.append('reportProgress', 'true');
    }
  }

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
      this._snackBar.open('Error al procesar la solicitud', 'ERROR', {
        duration: 2000,
      });
    }
  }
  public fileChangeExcel(event) {}

  public uploadFileExcel() {}
}
