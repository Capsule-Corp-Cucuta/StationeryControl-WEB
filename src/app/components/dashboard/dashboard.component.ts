import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { StatisticsService } from '../../core/services/statistics.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  chart = [];
  chartTypes = [];
  chartStates = [];
  chartAttendant = [];
  chartTownship = [];
  chartInstitution = [];
  chartTypeAttendant = [];
  chartTypeInstitution = [];
  chartStateAttendant = [];
  chartStateInstitution = [];
  // otras opciones

  public municipioSeleccionado: string;
  public typeAttendant = { type: '', attendant: '' };
  public typeInstitution = { type: '', institution: '' };
  public stateAttendant = { state: '', attendant: '' };
  public stateInstitution = { state: '', institution: '' };
  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.allCertificates();
    this.CertificatesByType();
    this.certificatesByStates();
  }

  public allCertificates() {
    this.statisticsService.allCertificates().subscribe((total) => {
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: ['Certificados registrados'],
          datasets: [
            {
              label: 'N° de certificados',
              data: [total],
              backgroundColor: ['blue'],
              borderColor: ['rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
  }

  public CertificatesByType() {
    this.statisticsService.findByType('CA_NV').subscribe((ca_nv) => {
      this.statisticsService.findByType('NV').subscribe((nv) => {
        this.statisticsService.findByType('CA_DEF').subscribe((ca_def) => {
          this.statisticsService.findByType('DEF').subscribe((def) => {
            this.chartTypes = new Chart('types', {
              type: 'doughnut',
              data: {
                labels: ['CA_NV', 'NV', 'CA_DEF', 'DEF'],
                datasets: [
                  {
                    label: 'Certificados',
                    data: [ca_nv, nv, ca_def, def],
                    backgroundColor: ['#FF5733', '#8DE114', '#108FC2', '#EEEE2A'],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              },
            });
          });
        });
      });
    });
  }

  public certificatesByStates() {
    this.statisticsService.findByState('IDLE').subscribe((idle) => {
      this.statisticsService.findByState('ASSIGNED').subscribe((assigned) => {
        this.statisticsService.findByState('GUARDED').subscribe((guarded) => {
          this.statisticsService.findByState('STRAY').subscribe((stray) => {
            this.statisticsService.findByState('ANNULLED').subscribe((annulled) => {
              this.statisticsService.findByState('WITH_INCONGRUENCES').subscribe((incongruences) => {
                this.chartStates = new Chart('states', {
                  type: 'bar',
                  data: {
                    labels: ['Sin uso', 'Asignados', 'Guardados', 'Extraviados', 'Anulados', 'Con incongruencias'],
                    datasets: [
                      {
                        label: 'Certificados',
                        data: [idle, assigned, guarded, stray, annulled, incongruences],
                        backgroundColor: ['#FF5733', '#8DE114', '#108FC2', '#EEEE2A', '#E166EE', '#FB7D07'],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  },
                  options: {
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  },
                });
              });
            });
          });
        });
      });
    });
  }

  public certificatesByAttendant(cedula: string) {
    if (cedula) {
      this.statisticsService.findByAttendant(cedula).subscribe((resp) => {
        console.log(resp);
        this.chartAttendant = new Chart('attendant', {
          type: 'line',
          data: {
            labels: ['Certificados de: ' + cedula],
            datasets: [
              {
                label: 'N° de certificados',
                data: [resp],
                backgroundColor: ['#076FFB'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      });
    }
  }

  public certificatesByTownship() {
    console.log(this.municipioSeleccionado);
    if (this.municipioSeleccionado) {
      this.statisticsService.findByTownship(this.municipioSeleccionado).subscribe((resp) => {
        console.log(resp);
        this.chartTownship = new Chart('township', {
          type: 'pie',
          data: {
            labels: ['Certificados de: ' + this.municipioSeleccionado],
            datasets: [
              {
                label: 'N° de certificados',
                data: [resp],
                backgroundColor: ['#26E729'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      });
    }
  }

  public certificatesByInstitution(institucion: string) {
    console.log(institucion);

    if (institucion) {
      this.statisticsService.findByInstitution(institucion).subscribe((resp) => {
        console.log(resp);
        this.chartInstitution = new Chart('institution', {
          type: 'bar',
          data: {
            labels: ['Certificados de: ' + institucion],
            datasets: [
              {
                label: 'N° de certificados',
                data: [resp],
                backgroundColor: ['#815ED2'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      });
    }
  }

  public certificatesByTypeAttendant() {
    if (this.typeAttendant.type.length > 0 && this.typeAttendant.attendant.length > 0) {
      this.statisticsService
        .findByTypeAttendant(this.typeAttendant.type, this.typeAttendant.attendant)
        .subscribe((resp) => {
          this.chartTypeAttendant = new Chart('typeAttendant', {
            type: 'pie',
            data: {
              labels: ['Certificados'],
              datasets: [
                {
                  label: 'N° de certificados',
                  data: [resp],
                  backgroundColor: ['#F3EF12'],
                  borderColor: ['rgba(255, 99, 132, 1)'],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          });
        });
    }
  }

  public certificatesByTypeInstitution() {
    if (this.typeInstitution.type.length > 0 && this.typeInstitution.institution.length > 0) {
      this.statisticsService
        .findByTypeInstitution(this.typeInstitution.type, this.typeInstitution.institution)
        .subscribe((resp) => {
          this.chartTypeInstitution = new Chart('typeInstitution', {
            type: 'bar',
            data: {
              labels: ['Certificados'],
              datasets: [
                {
                  label: 'N° de certificados',
                  data: [resp],
                  backgroundColor: ['#F33B12'],
                  borderColor: ['rgba(255, 99, 132, 1)'],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          });
        });
    }
  }

  public certificatesByStateAttendant() {
    if (this.stateAttendant.state.length > 0 && this.stateAttendant.attendant.length > 0) {
      this.statisticsService
        .findByStateAttendant(this.stateAttendant.state, this.stateAttendant.attendant)
        .subscribe((resp) => {
          this.chartStateAttendant = new Chart('stateAttendant', {
            type: 'line',
            data: {
              labels: ['Certificados'],
              datasets: [
                {
                  label: 'N° de certificados',
                  data: [resp],
                  backgroundColor: ['#12F394'],
                  borderColor: ['rgba(255, 99, 132, 1)'],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          });
        });
    }
  }

  public certificatesByStateInstitution() {
    if (this.stateInstitution.state.length > 0 && this.stateInstitution.institution.length > 0) {
      this.statisticsService
        .findByStateInstitution(this.stateInstitution.state, this.stateInstitution.institution)
        .subscribe((resp) => {
          this.chartStateInstitution = new Chart('stateInstitution', {
            type: 'pie',
            data: {
              labels: ['Certificados'],
              datasets: [
                {
                  label: 'N° de certificados',
                  data: [resp],
                  backgroundColor: ['#F31223'],
                  borderColor: ['rgba(255, 99, 132, 1)'],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          });
        });
    }
  }

  public types = ['CA_NV', 'NV', 'CA_DEF', 'DEF'];

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
