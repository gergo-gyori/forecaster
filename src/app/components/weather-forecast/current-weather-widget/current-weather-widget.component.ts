import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-current-weather-widget',
  templateUrl: './current-weather-widget.component.html',
  styleUrls: ['./current-weather-widget.component.scss']
})
export class CurrentWeatherWidgetComponent implements OnInit {
  @Input() city: string;
  currentWeatherData: WeatherData;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentWeather();
  }

  getCurrentWeather() {
    this.weatherService.fetchCurrentWeather(this.city).subscribe(currentWeatherData => {
      this.currentWeatherData = currentWeatherData;
    }, error => {
      // this.error = true;
    });
  }

}