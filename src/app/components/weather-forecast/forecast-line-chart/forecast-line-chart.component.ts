import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-forecast-line-chart',
  templateUrl: './forecast-line-chart.component.html',
  styleUrls: ['./forecast-line-chart.component.scss']
})
export class ForecastLineChartComponent implements OnInit {
  @Input() city: string;
  @Output() errorEvent = new EventEmitter();
  forecastData: any[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getFiveDayForecast();
  }

  getFiveDayForecast() {
    this.weatherService.fetchFiveDayForecast(this.city).subscribe(forecastData => {
      this.forecastData = forecastData;
    }, error => {
      this.errorEvent.emit(true);
    });
  }

}
