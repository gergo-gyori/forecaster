import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.scss']
})
export class CityDialogComponent implements OnInit {
  city = 'texas';
  dialogMode = 'remove';
  invalidCity = false;

  weatherDb: any[] = [];

  constructor(
    private dialog: MatDialog,
    private weatherService: WeatherService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.readWeatherDb();
  }

  onAddCity(city: string) {

    // Check if given city is found by the API
    this.weatherService.fetchCurrentWeather(city).subscribe(success => {
      this.weatherDb.push({
        userId: JSON.parse(localStorage.getItem('activeUser')).id,
        city
      });
      localStorage.setItem('weatherDb', JSON.stringify(this.weatherDb));
      this.dialog.closeAll();
    }, error => {
      this.invalidCity = true;
    });
  }

  onRemoveCity(city: string) {
    const newWeatherDb = this.weatherDb.filter(el => el.city !== city);
    localStorage.setItem('weatherDb', JSON.stringify(newWeatherDb));
    this.dialog.closeAll();
  }

  readWeatherDb() {
    if (localStorage.getItem('weatherDb') !== null) {
      this.weatherDb = JSON.parse(localStorage.getItem('weatherDb'));
    }
  }
}
