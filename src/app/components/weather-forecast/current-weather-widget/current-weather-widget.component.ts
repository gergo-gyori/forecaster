import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data.model';

@Component({
  selector: 'app-current-weather-widget',
  templateUrl: './current-weather-widget.component.html',
  styleUrls: ['./current-weather-widget.component.scss']
})
export class CurrentWeatherWidgetComponent implements OnInit {
  @Input() currentWeatherData: WeatherData;

  constructor() { }

  ngOnInit() {
  }

}
