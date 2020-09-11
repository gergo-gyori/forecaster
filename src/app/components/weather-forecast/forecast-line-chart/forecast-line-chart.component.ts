import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-forecast-line-chart',
  templateUrl: './forecast-line-chart.component.html',
  styleUrls: ['./forecast-line-chart.component.scss']
})
export class ForecastLineChartComponent implements OnInit, OnDestroy {
  @Input() city: string;
  @Output() errorEvent = new EventEmitter();
  forecastData: any[] = [];
  weatherSubscription: Subscription;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getFiveDayForecast();
  }

  getFiveDayForecast() {
    this.weatherSubscription = this.weatherService.fetchFiveDayForecast(this.city).subscribe(forecastData => {
      this.forecastData = forecastData;
    }, error => {
      this.errorEvent.emit(true);
    });
  }

  ngOnDestroy() {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

}
