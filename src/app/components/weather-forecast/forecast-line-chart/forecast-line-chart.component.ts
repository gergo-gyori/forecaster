import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecast-line-chart',
  templateUrl: './forecast-line-chart.component.html',
  styleUrls: ['./forecast-line-chart.component.scss']
})
export class ForecastLineChartComponent implements OnInit {
  @Input() forecastData: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
