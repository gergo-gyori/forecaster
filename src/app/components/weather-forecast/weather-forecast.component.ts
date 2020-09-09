import { Component, OnInit } from '@angular/core';

import { WeatherData } from 'src/app/models/weather-data.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  city = 'alaska ';
  currentWeatherData: WeatherData;
  forecastData: any[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentWeather();
    this.getFiveDayForecast();
  }

  getCurrentWeather() {
    this.weatherService.fetchCurrentWeather(this.city).subscribe(currentWeatherData => {
      this.currentWeatherData = currentWeatherData;
    });
  }

  getFiveDayForecast() {
    this.weatherService.fetchFiveDayForecast(this.city).subscribe(forecastData => {
      this.forecastData = forecastData;
    });
  }

}
