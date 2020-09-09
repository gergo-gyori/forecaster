import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  city = 'budapest';
  weatherData: WeatherData;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getCurrentWeather(this.city).subscribe(weatherData => {
      this.weatherData = weatherData;
      console.log(this.weatherData);
    });
  }

}
