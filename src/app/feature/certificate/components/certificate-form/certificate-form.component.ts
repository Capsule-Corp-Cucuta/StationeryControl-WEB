import * as XLSX from 'xlsx';
import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Certificate } from '../../../../core/models/certificate.model';
import { FacadeService } from '../../../../core/services/facade.service';
import { Constants } from '../../../../shared/constants/global-constants';
import { CertificateService } from '../../../../core/services/certificate.service';
import { CertificateState, CertificateType } from '../../../../core/models/certificate.model';
import { HttpErrorResponse } from '@angular/common/http';

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

  public readonly ICONS = Constants.ICONS;
  public readonly DEPARTMENT = Constants.DEPARTMENT;
  public readonly LABELS = Constants.LABELS.CERTIFICATE.FORM;
  public readonly TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public readonly STATES = Constants.CERTIFICATES_STATES_MAPPER;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private certificadoService: CertificateService,
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
      stateRuaf: [CertificateState.IDLE, [Validators.required]],
      township: ['', [Validators.required]],
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
      this.certificadoService.create(certificate).subscribe(
        (resp) => {
          // TODO Message
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
      this.certificadoService.update(certificate.number, certificate).subscribe(
        (resp) => {
          // TODO Message
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
    if (err.status === 400) {
      // TODO Message
    } else if (err.status === 401) {
      // TODO Message
    } else if (err.status === 403) {
      // TODO Message
    } else if (err.status === 404) {
      // TODO Message
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
        };
        certificatesToRegister.push(certificate);
      });
      this.certificadoService
        .createMultiple(certificatesToRegister)
        .pipe(
          finalize(() => {
            this.router.navigate(['/']);
          })
        )
        .subscribe((response) => {
          // TODO
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
}
