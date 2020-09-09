import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData } from '../models/weather-data.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'e4edd2bd339b9006f48f4e517e2a60f0';
  currentWeatherData: any;
  forecastWeatherData: any;

  constructor(private http: HttpClient) { }


  fetchCurrentWeather(city: string): Observable<WeatherData> {
    return this.http.get<Observable<any>>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
    )
      .pipe(map(responseData => {
        this.currentWeatherData = responseData;
        const data = this.initCurrentWeatherData(city, this.currentWeatherData);

        return data;
      }));
  }


  initCurrentWeatherData(city: string, weatherData: any): WeatherData {
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


  fetchFiveDayForecast(city: string): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}`
    )
      .pipe(map(responseData => {
        this.forecastWeatherData = responseData;
        const data = this.initForecastData(city, this.forecastWeatherData);

        return data;
      }));
  }


  initForecastData(city: string, forecastData: any) {
    const forecastChartData = [
      {
        name: city.charAt(0).toUpperCase() + city.slice(1),
        series: []
      }
    ];

    forecastData.list.forEach(current => {
      forecastChartData[0].series.push(
        {
          name: new Date(current.dt * 1000),
          value: (current.main.temp - 272.15).toFixed(0)
        }
      );
    });

    return forecastChartData;
  }

}
