import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-forecast-line-chart',
  templateUrl: './forecast-line-chart.component.html',
  styleUrls: ['./forecast-line-chart.component.scss']
})
export class ForecastLineChartComponent implements OnInit {
  @Input() city: string;
  forecastData: any[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getFiveDayForecast();
  }

  getFiveDayForecast() {
    this.weatherService.fetchFiveDayForecast(this.city).subscribe(forecastData => {
      this.forecastData = forecastData;
      console.log(this.forecastData);
    }, error => {
      // this.error = true;
    });
  }

}
