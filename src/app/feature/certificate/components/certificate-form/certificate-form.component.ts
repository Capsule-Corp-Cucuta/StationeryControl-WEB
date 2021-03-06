import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Institution } from 'src/app/core/models/institution.model';
import { Certificate } from '../../../../core/models/certificate.model';
import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';
import { CertificateState, CertificateType } from '../../../../core/models/certificate.model';
import { Historical } from 'src/app/core/models/historical.model';
import { MatDialog } from '@angular/material/dialog';
import { CertificateModalHistoricalComponent } from '../certificate-modal-historical/certificate-modal-historical.component';

@Component({
  selector: 'app-certificate-form',
  templateUrl: './certificate-form.component.html',
  styleUrls: ['../../../../shared/styles/form.component.scss'],
})
export class CertificateFormComponent implements OnInit {
  public user: string;
  public fileName: string;
  public authority: string;
  public messageError:string;
  public messageErrorInitial:string;
  public errorInitial=false;
  public error=false;
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
  public historical: Historical[] = [];

  public readonly ICONS = Constants.ICONS;
  public readonly DEPARTMENT = Constants.DEPARTMENT;
  public readonly LABELS = Constants.LABELS.CERTIFICATE.FORM;
  public readonly TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public readonly STATES = Constants.CERTIFICATES_STATES_MAPPER;


  constructor(
    private router: Router,
    public dialog: MatDialog,
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
    this.listInstitutions(null);
  }

  private validateExistentCertificate(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.certificateNumber = params.number;
      if (this.certificateNumber) {
        this.isCreate = false;
        this.service.findCertificateByNumber(this.certificateNumber).subscribe((resp) => {
          if (
            this.validateStatus(resp.state.toString()) === CertificateState.IDLE ||
            this.validateStatus(resp.state.toString()) === CertificateState.ASSIGNED ||
            this.validateStatus(resp.state.toString()) === CertificateState.GUARDED
          ) {
            this.showUploadAttachment = false;
          }
          this.validateStatesEnabled(resp.state.toString());
          this.validateInput(true);
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
      institution: [''],
      number: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(9)]],
      state: [CertificateState.IDLE, [Validators.required]],
      stateRUAF: [CertificateState.IDLE],
      stateDateRUAF: [''],
      township: [''],
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
      console.log(certificate);
      
      this.service.createCertificate(certificate).subscribe(
        (resp) => {
          Swal.fire('Exito!', 'Certificado Registrado.', 'success');
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
    this.validateInput(false); // Se habilitan campos Desabilitados para obtener su informacion
    if (this.form.valid) {
      const certificate = this.form.value;
      this.service.updateCertificate(certificate.number, certificate).subscribe(
        (resp) => {
          Swal.fire('Exito!', 'Certificado Actualizado.', 'success');
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
      Swal.fire('Exito!', 'Archivo subido.', 'success');
      this.router.navigate(['./certificado/lista']);
    },
    (err) => {
      this.handlerError(err);
    }
    );
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
      Swal.fire('Oops...!', 'Error al registrar/actualizar certificado.', 'error');
    } else if (err.status === 500) {
      Swal.fire('ERROR 500 !', 'INTERNAL, SERVER ERROR.', 'error');
    } else {
      Swal.fire('Oops...!', 'ah ocurrido un error, intenta mas tarde.', 'error');
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
          type: this.validateTypesExcel(raw['TIPO'].toString()),
          state: this.validatStatesExcel(raw['ESTADO'].toString()),
          attendant: this.service.getUser(),
          department: raw['DEPARTAMENTO'] ? raw['DEPARTAMENTO'] : null,
          township: raw['MUNICIPIO'] ? raw['MUNICIPIO'] : null,
          institution: raw['NOMBRE INSTITUCIÓN'] ? raw['NOMBRE INSTITUCIÓN'] : null,
          stateRUAF: raw['ESTADORUAF'] ? raw['ESTADORUAF'] : null,
          stateDateRUAF: raw['ESTADORUAF'] ? new Date((raw['FECHAESTADORUAF'] - 25569) * 86400 * 1000) : null,
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
        .subscribe(
          (response) => {
            Swal.fire('Exito!', 'Certificados Registrados.', 'success');
          },
          (err) => {
            this.handlerError(err);
          }
        );
    };
    fileReader.readAsArrayBuffer(this.fileExcel);
  }

  private validateTypesExcel(type: string) {
    switch (type) {
      case 'CA de Nacido Vivo':
        return CertificateType.CA_NV;
      case 'Nacido vivo':
        return CertificateType.NV;
      case 'CA de Defuncion':
        return CertificateType.CA_DEF;
      case 'Defuncion':
        return CertificateType.DEF;
    }
  }

  private validatStatesExcel(state: string) {
    switch (state) {
      case 'Sin uso':
        return CertificateState.IDLE;
      case 'Asignado':
        return CertificateState.ASSIGNED;
      case 'Guardado':
        return CertificateState.GUARDED;
      case 'Extraviado':
        return CertificateState.STRAY;
      case 'Anulado':
        return CertificateState.ANNULLED;
      case 'Con incongruencias':
        return CertificateState.WITH_INCONGRUENCES;
    }
  }

  public validateNumberInput(e){
    this.messageError=" ";
    if (e !== '') {
      if(e.length < 8 || e.length > 9){
        this.error=true;
        this.messageError = 'El numero de Certificado debe contener entre (8-9) caracteres';
      }
    }else{
      this.error=true;
      this.messageError = 'Numero de Certificado requerido';
    }
  }

  public validateInitialNumber(type:string){
    this.messageErrorInitial=" ";
    if(this.validateTypes(type) === CertificateType.NV ||this.validateTypes(type) === CertificateType.CA_NV){
      this.errorInitial=true;
      this.messageErrorInitial ='Numero de certificado debe empezar por el digito 1 o 5';
    }else if(this.validateTypes(type) === CertificateType.DEF ||this.validateTypes(type) === CertificateType.CA_DEF){
      this.errorInitial=true;
      this.messageErrorInitial ='Numero de certificado debe empezar por el digito 7 o 8';
    }
  }

  private validateInput(exito: Boolean) {
    if (exito) {
      this.form.controls['attendant'].disable();
      this.form.controls['number'].disable();
      this.form.controls['type'].disable();
    } else {
      this.form.controls['attendant'].enable();
      this.form.controls['number'].enable();
      this.form.controls['type'].enable();
      this.form.controls['state'].enable();
    }
  }

  private validateStatus(state: string) {
    switch (state) {
      case 'IDLE':
        return 0;
      case 'ASSIGNED':
        return 1;
      case 'GUARDED':
        return 2;
      case 'STRAY':
        return 3;
      case 'ANNULLED':
        return 4;
      case 'WITH_INCONGRUENCES':
        return 5;  
    }
  }
  private validateTypes(type: string) {
    switch (type) {
      case 'CA_NV':
        return 0;
      case 'NV':
        return 1;
      case 'CA_DEF':
        return 2;
      case 'DEF':
        return 3;
    }
  }

  private validateStatesEnabled(state:string){
    if(this.authority === 'USER'){
       if(this.validateStatus(state) === CertificateState.STRAY ||
          this.validateStatus(state) === CertificateState.ANNULLED ||
          this.validateStatus(state) === CertificateState.WITH_INCONGRUENCES
        ){
          this.form.controls['state'].disable();
       }
    }
  }


  private listTownships(): void {
    this.service.findAllTownships().subscribe(
      (response) => {
        this.TOWNSHIPS = response;
      },
      (error: HttpErrorResponse) => {
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

  public openDialog(){
    const certificateNumber = this.certificateNumber;
    this.dialog.open(CertificateModalHistoricalComponent, {
      data: certificateNumber,
    });
  }
}
