import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherData } from 'src/app/models/weather-data.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-current-weather-widget',
  templateUrl: './current-weather-widget.component.html',
  styleUrls: ['./current-weather-widget.component.scss']
})
export class CurrentWeatherWidgetComponent implements OnInit, OnDestroy {
  @Input() city: string;
  @Output() errorEvent = new EventEmitter();
  currentWeatherData: WeatherData;
  weatherSubscription: Subscription;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentWeather();
  }

  getCurrentWeather() {
    this.weatherSubscription = this.weatherService.fetchCurrentWeather(this.city).subscribe(currentWeatherData => {
      this.currentWeatherData = currentWeatherData;
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
