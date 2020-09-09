import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData } from '../models/weather-data.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherData: any;

  constructor(private http: HttpClient) { }

  getCurrentWeather(city: string): Observable<WeatherData> {
    return this.http.get<Observable<any>>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e4edd2bd339b9006f48f4e517e2a60f0`
    )
      .pipe(map(responseData => {
        this.weatherData = responseData;
        const data = this.initWeatherData(city, this.weatherData);

        return data;
      }));
  }

  initWeatherData(city: string, weatherData: any): WeatherData {
    const data: WeatherData = {
      userId: JSON.parse(localStorage.getItem('activeUser')).id,
      city,
      temperature: Number((weatherData.main.temp - 272.15).toFixed(0)),
      humidity: weatherData.main.humidity,
      atmosphericPressure: weatherData.main.pressure,
      windSpeed: weatherData.wind.speed,
      windDirection: weatherData.wind.deg,
      isDay: new Date().getTime() < new Date(weatherData.sys.sunset * 1000).getTime()
    };
    return data;
  }

}
