import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Constants } from '../../../shared/constants/global-constants';
import { StatisticsService } from '../../../core/services/statistics.service';
import { CertificateStatePipe } from '../../../shared/pipes/certificate-state.pipe';
import { FacadeService } from '../../../core/services/facade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public chartTypes = [];
  public chartStates = [];
  public chartTypesUser = [];
  public user: string;
  public authority: string;
  public userSesiom = false;

  public COLORS = Constants.CHARTS.COLORS;
  public LABELS = Constants.LABELS.DASHBOARD;
  public CHART_TYPES = Constants.CHARTS.TYPES;
  public TYPES = Constants.CERTIFICATES_TYPES_MAPPER;
  public STATES = Constants.CERTIFICATES_STATES_MAPPER;

  constructor(private statisticsService: StatisticsService, private certificateStatePipe: CertificateStatePipe, private service: FacadeService) {}

  ngOnInit(): void {
    this.user = this.service.getUser();
    this.authority = this.service.getAuthorities()[0];
    if (this.authority === 'USER') {
      this.userSesiom = true;
      this.printCertificatesByTypeUser();
    }else{
    this.printCertificatesByType();
    this.printCertificatesByStates();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private printCertificatesByType(): void {
    this.chartTypes = [];
    const data: number[] = [];
    const types: string[] = [];

    this.TYPES.map((item) => {
      const subscription = this.statisticsService.countByType(item.value).subscribe((response) => {
        data.push(response);
        types.push(item.value);

        if (data.length === this.TYPES.length) {
          this.chartTypes = this.printChart(
            this.LABELS.CHART_TYPES.ID,
            this.CHART_TYPES.BAR,
            types,
            data,
            this.COLORS.TYPES
          );
        }
      });
      this.subscriptions.push(subscription);
      return subscription;
    });
  }

  private printCertificatesByStates() {
    this.chartStates = [];
    const data: number[] = [];
    const states: string[] = [];

    this.STATES.map((item) => {
      const subscription = this.statisticsService.countByState(item.value).subscribe((response) => {
        data.push(response);
        states.push(this.certificateStatePipe.transform(item.value).toString());

        if (data.length === this.STATES.length) {
          this.chartStates = this.printChart(
            this.LABELS.CHART_STATES.ID,
            this.CHART_TYPES.BAR,
            states,
            data,
            this.COLORS.STATES
          );
        }
      });
      this.subscriptions.push(subscription);
      return subscription;
    });
  }

  private printCertificatesByTypeUser(): void {
    this.chartTypesUser = [];
    const data: number[] = [];
    const types: string[] = [];

    this.TYPES.map((item) => {
      const subscription = this.statisticsService.countByTypeAndAttendant(item.value,this.user).subscribe((response) => {
        data.push(response);
        types.push(item.value);

        if (data.length === this.TYPES.length) {
          this.chartTypesUser = this.printChart(
            this.LABELS.CHART_TYPES.ID,
            this.CHART_TYPES.BAR,
            types,
            data,
            this.COLORS.TYPES
          );
        }
      });
      this.subscriptions.push(subscription);
      return subscription;
    });
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
