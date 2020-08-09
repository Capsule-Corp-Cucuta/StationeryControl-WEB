import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';

import { Constants } from '../../../shared/constants/global-constants';
import { StatisticsService } from '../../../core/services/statistics.service';

import { CertificateStatePipe } from '../../../shared/pipes/certificate-state.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public chartTypes = [];
  public chartStates = [];
  public chartTypeAndAttendant = [];
  public chartTypeAndInstitution = [];
  public chartStateAndAttendant = [];
  public chartStateAndInstitution = [];
  public townshipSelected: string;
  public typeAndAttendant: string;
  public typeAndInstitution: string;
  public stateAndAttendant: string;
  public stateAndInstitution: string;

  public TOWNSHIPS = Constants.TOWNSHIPS;
  public COLORS = Constants.CHARTS.COLORS;
  public LABELS = Constants.LABELS.DASHBOARD;
  public CHART_TYPES = Constants.CHARTS.TYPES;
  public TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public STATES = Constants.CERTIFICATES_STATES_MAPPER;

  constructor(private statisticsService: StatisticsService, private certificateStatePipe: CertificateStatePipe) {}

  ngOnInit(): void {
    this.printCertificatesByType();
    this.printCertificatesByStates();
  }

  private printCertificatesByType(): void {
    this.chartTypes = [];
    const data: number[] = [];

    for (const type of this.TYPES) {
      this.statisticsService.countByType(type.value).subscribe((response) => {
        data.push(response);

        if (data.length === this.TYPES.length) {
          this.chartTypes = this.printChart(
            this.LABELS.CHART_TYPES.ID,
            this.CHART_TYPES.BAR,
            this.TYPES.map((item) => item.value),
            data,
            this.COLORS.TYPES
          );
        }
      });
    }
  }

  private printCertificatesByStates() {
    this.chartStates = [];
    const data: number[] = [];

    for (const type of this.STATES) {
      this.statisticsService.countByState(type.value).subscribe((response) => {
        data.push(response);

        if (data.length === this.STATES.length) {
          this.chartStates = this.printChart(
            this.LABELS.CHART_STATES.ID,
            this.CHART_TYPES.BAR,
            this.STATES.map((item) => this.certificateStatePipe.transform(item.value)),
            data,
            this.COLORS.STATES
          );
        }
      });
    }
  }

  public printCertificatesByTypeAndAttendant() {
    this.chartTypeAndAttendant = [];
    if (this.typeAndAttendant) {
      const data: number[] = [];

      for (const type of this.TYPES) {
        this.statisticsService.countByTypeAndAttendant(type.value, this.typeAndAttendant).subscribe((response) => {
          data.push(response);

          if (data.length === this.TYPES.length) {
            this.chartTypeAndAttendant = this.printChart(
              this.LABELS.CHART_TYPES_AND_ATTENDANT.ID,
              this.CHART_TYPES.DOUGHNUT,
              this.TYPES.map((item) => item.value),
              data,
              this.COLORS.TYPES
            );
          }
        });
      }
    } else {
      // TODO
    }
  }

  public printCertificatesByTypeAndInstitution() {
    this.chartTypeAndInstitution = [];
    if (this.typeAndInstitution) {
      const data: number[] = [];

      for (const type of this.TYPES) {
        this.statisticsService.countByTypeAndInstitution(type.value, this.typeAndInstitution).subscribe((response) => {
          data.push(response);

          if (data.length === this.TYPES.length) {
            this.chartTypeAndInstitution = this.printChart(
              this.LABELS.CHART_TYPES_AND_INSTITUTION.ID,
              this.CHART_TYPES.DOUGHNUT,
              this.TYPES.map((item) => item.value),
              data,
              this.COLORS.TYPES
            );
          }
        });
      }
    } else {
      // TODO
    }
  }

  public printCertificatesByStateAttendant() {
    this.chartStateAndAttendant = [];
    if (this.stateAndAttendant) {
      const data: number[] = [];

      for (const type of this.STATES) {
        this.statisticsService.countByStateAndAttendant(type.value, this.stateAndAttendant).subscribe((response) => {
          data.push(response);

          if (data.length === this.STATES.length) {
            this.chartStateAndAttendant = this.printChart(
              this.LABELS.CHART_STATES_AND_ATTENDANT.ID,
              this.CHART_TYPES.DOUGHNUT,
              this.STATES.map((item) => this.certificateStatePipe.transform(item.value)),
              data,
              this.COLORS.STATES
            );
          }
        });
      }
    } else {
      // TODO
    }
  }

  public printCertificatesByStateInstitution() {
    this.chartStateAndInstitution = [];
    if (this.stateAndInstitution) {
      const data: number[] = [];

      for (const type of this.STATES) {
        this.statisticsService
          .countByStateAndInstitution(type.value, this.stateAndInstitution)
          .subscribe((response) => {
            data.push(response);

            if (data.length === this.STATES.length) {
              this.chartStateAndInstitution = this.printChart(
                this.LABELS.CHART_STATES_AND_INSTITUTION.ID,
                this.CHART_TYPES.DOUGHNUT,
                this.STATES.map((item) => this.certificateStatePipe.transform(item.value)),
                data,
                this.COLORS.STATES
              );
            }
          });
      }
    } else {
      // TODO
    }
  }

  private printChart(id: string, type: string, labels: any[], data: number[], backgroundColor: any[]): any {
    return new Chart(id, {
      type,
      data: {
        labels,
        datasets: [{ label: 'Certificados', data, backgroundColor }],
      },
      options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
    });
  }
}
