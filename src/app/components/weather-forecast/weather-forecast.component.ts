import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { WeatherData } from 'src/app/models/weather-data.model';
import { WeatherService } from 'src/app/services/weather.service';
import { CityDialogComponent } from './city-dialog/city-dialog.component';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  city = 'alaska ';
  currentWeatherData: WeatherData;
  forecastData: any[] = [];

  constructor(private weatherService: WeatherService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getCurrentWeather();
    this.getFiveDayForecast();
  }

  openAddCityDialog() {
    let dialogRef = this.dialog.open(CityDialogComponent, {data: {mode: 'add'}});

    // dialogRef.afterClosed().subscribe(result => {
      
    // });
  }

  openRemoveCityDialog() {
    let dialogRef = this.dialog.open(CityDialogComponent, {data: {mode: 'remove'}});
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
