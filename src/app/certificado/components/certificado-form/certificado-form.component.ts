import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CertificadoService } from '../../../core/services/certificado.service';
import { CertificateState, CertificateType } from '../../../core/models/certificado.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-certificado-form',
  templateUrl: './certificado-form.component.html',
  styleUrls: ['./certificado-form.component.scss'],
})
export class CertificadoFormComponent implements OnInit {
  public form: FormGroup;
  public form2: FormGroup;
  public isCreate: boolean;
  public tipo: boolean;
  public nameFile: string;
  public idFile: number;
  private file: FormData;

  public types2 = ['CA_NV', 'NV', 'CA_DEF', 'DEF'];

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private certificadoService: CertificadoService,
    private activateRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm();
    this.buildFormFile();
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      const number = params.number;
      if (number) {
        this.isCreate = false;
        this.certificadoService.findByID(number).subscribe((resp) => {
          this.idFile = resp['number'];
          if (resp['state'] === 'IDLE' || resp['state'] === 'ASSIGNED' || resp['state'] === 'GUARDED') {
            this.tipo = false;
          } else {
            this.tipo = true;
          }
          this.form.patchValue(resp);
        });
      } else {
        this.isCreate = true;
      }
    });
  }

  private buildForm() {
    this.form = this.builder.group({
      attendant: ['', [Validators.required]],
      department: ['NORTE DE SANTANDER', [Validators.required]],
      institution: ['', [Validators.required]],
      number: ['', [Validators.required]],
      state: [CertificateState.IDLE, [Validators.required]],
      township: ['', [Validators.required]],
      type: [CertificateType.CA_NV, [Validators.required]],
      verificationCode: ['', [Validators.required]],
    });
  }

  private buildFormFile() {
    this.form2 = this.builder.group({
      attachment: [''],
    });
  }

  public create(e: Event) {
    e.preventDefault();

    if (this.form.valid) {
      const certificate = this.form.value;
      this.certificadoService.create(certificate).subscribe(
        (resp) => {
          // TODO
          this._snackBar.open('Registro Exitoso', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./certificado/lista']);
        },
        (err) => {
          // TODO
          alert(err.error.message);
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
          // TODO
          this._snackBar.open('Certificado Actualizado', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./certificado/lista']);
        },
        (err) => {
          // TODO
          alert(err.error.message);
        }
      );
    }
  }

  public adjuntarArchivo() {
    this.certificadoService.postFile(this.idFile, this.file).subscribe((resp) => {
      console.log(resp);
      this._snackBar.open('Archivo subido', 'OK', {
        duration: 2000,
      });
    });
  }

  public fileChange(event) {
    console.log(event.target.files[0].name);
    this.nameFile = event.target.files[0].name;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.file = new FormData();
      this.file.append('file', file);
      this.file.append('reportProgress', 'true');
    }
  }

  public adjuntarArchivoExcel() {}

  public fileChangeExcel(event) {
    console.log(event.target.files[0].name);
  }

  public types = [
    { id: 0, valor: 'CA_NV' },
    { id: 1, valor: 'NV' },
    { id: 2, valor: 'CA_DEF' },
    { id: 3, valor: 'DEF' },
  ];

  public states = ['IDLE', 'ASSIGNED', 'GUARDED', 'STRAY', 'ANNULLED', 'WITH_INCONGRUENCES'];

  public municipios = [
    'Abrego',
    'Arboledas',
    'Bochalema',
    'Bucarasica',
    'Cachira',
    'Cacota',
    'Chinacota',
    'Chitaga',
    'Convencion',
    'Cucuta',
    'Cucutilla',
    'Durania',
    'El Carmen',
    'El Tarra',
    'El Zulia',
    'Gramalote',
    'Hacari',
    'Herran',
    'La Esperanza',
    'La Playa de Belen',
    'Labateca',
    'Los Patios',
    'Lourdes',
    'Mutiscua',
    'Ocaña',
    'Pamplona',
    'Pamplonita',
    'Puerto Santander',
    'Ragonvalia',
    'Salazar de Las Palmas',
    'San Calixto',
    'San Cayetano',
    'Santiago',
    'Santo Domingo de Silos',
    'Sardinata',
    'Teorama',
    'Tibu',
    'Toledo',
    'Villa Caro',
    'Villa del Rosario',
  ];
}
