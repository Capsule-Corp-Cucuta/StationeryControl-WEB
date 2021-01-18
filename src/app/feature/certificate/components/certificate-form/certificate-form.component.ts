import * as XLSX from 'xlsx';
import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Certificate } from '../../../../core/models/certificate.model';
import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';
import { Institution } from 'src/app/core/models/institution.model';
import { CertificateService } from '../../../../core/services/certificate.service';
import { CertificateState, CertificateType } from '../../../../core/models/certificate.model';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificate-form',
  templateUrl: './certificate-form.component.html',
  styleUrls: ['../../../../shared/styles/form.component.scss'],
})
export class CertificateFormComponent implements OnInit {
  public user: string;
  public fileName: string;
  public authority: string;
  public isCreate = true;
  public userSesiom = false;
  public showUploadAttachment = true;
  private certificateNumber: number;
  public form: FormGroup;
  public formFile: FormGroup;
  private attachmentFormData: FormData;
  private fileExcel: File;
  private arrayBufferExcel: any;
  public TOWNSHIPS: string[];
  public INSTITUTIONS: Institution[];

  public readonly ICONS = Constants.ICONS;
  public readonly DEPARTMENT = Constants.DEPARTMENT;
  public readonly LABELS = Constants.LABELS.CERTIFICATE.FORM;
  public readonly TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public readonly STATES = Constants.CERTIFICATES_STATES_MAPPER;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private service: FacadeService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.validateExistentCertificate();
    this.user = this.service.getUser();
    this.authority = this.service.getAuthorities()[0];
    if (this.authority === 'USER') {
      this.userSesiom = true;
    }
    this.listTownships();
  }

  private validateExistentCertificate(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.certificateNumber = params.number;
      if (this.certificateNumber) {
        this.isCreate = false;
        this.service.findCertificateByNumber(this.certificateNumber).subscribe((resp) => {
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
      institution: ['',],
      number: ['', [Validators.required]],
      state: [CertificateState.IDLE, [Validators.required]],
      stateRUAF: [CertificateState.IDLE, [Validators.required]],
      stateDateRUAF:[''],
      township: ['',],
      type: [CertificateType.CA_NV, [Validators.required]],
    });
  }

  private buildFormFile() {
    this.formFile = this.builder.group({
      attachment: [''],
    });
  }

  public create(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      const certificate = this.form.value;
      certificate.attendant = this.user; 
      this.service.createCertificate(certificate).subscribe(
        (resp) => {
          Swal.fire(
            'Exito!',
            'Certificado Registrado.',
            'success'
          );
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
      this.service.updateCertificate(certificate.number, certificate).subscribe(
        (resp) => {
          Swal.fire(
            'Exito!',
            'Certificado Actualizado.',
            'success'
          );
          this.router.navigate(['./certificado/lista']);
        },
        (err) => {
          this.handlerError(err);
        }
      );
    }
  }

  public uploadFile() {
    this.service.postCertificateFile(this.certificateNumber, this.attachmentFormData).subscribe((resp) => {
      // TODO Message
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
    if (err.status === 404) {
        Swal.fire(
          'Oops...!',
          'Error al registrar/actualizar certificado.',
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

  public fileChangeExcel(event) {
    this.fileExcel = event.target.files[0];
  }

  public uploadFileExcel() {
    const certificatesToRegister: Certificate[] = [];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBufferExcel = fileReader.result;
      const data = new Uint8Array(this.arrayBufferExcel);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      XLSX.utils.sheet_to_json(worksheet, { raw: true }).map((raw) => {
        const certificate: Certificate = {
          number: Number(raw['NO_CERTIFICADO'].toString()),
          type: raw['TIPO'] ? raw['TIPO'] : CertificateType.CA_NV,
          state: raw['STADO'] ? raw['ESTADO'] : CertificateState.GUARDED,
          attendant: this.service.getUser(),
          department: raw['DEPARTAMENTO'] ? raw['DEPARTAMENTO'] : null,
          township: raw['MUNICIPIO'] ? raw['MUNICIPIO'] : null,
          institution: raw['NOMBRE INSTITUCIÓN'] ? raw['NOMBRE INSTITUCIÓN'] : null,
          stateRUAF: raw['STADORUAF'] ? raw['ESTADORUAF'] : CertificateState.IDLE,
          stateDateRUAF: raw['STADODATERUAF'] ? raw['FECHAESTADORUAF'] : null,
        };
        certificatesToRegister.push(certificate);
      });
      this.service
        .createMultipleCertificates(certificatesToRegister)
        .pipe(
          finalize(() => {
            this.router.navigate(['/']);
          })
        )
        .subscribe((response) => {
          // TODO
          Swal.fire(
            'Exito!',
            'Certificados Registrados.',
            'success'
          );
        });
    };
    fileReader.readAsArrayBuffer(this.fileExcel);
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
}
