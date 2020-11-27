import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
})
export class StatisticsCardComponent implements OnInit {
  @Input() public LABELS;
  @Input() public chart;

  constructor() {}

  ngOnInit(): void {}
}
