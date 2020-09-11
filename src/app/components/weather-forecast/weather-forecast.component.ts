import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CityDialogComponent } from './city-dialog/city-dialog.component';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  usersWeatherData: any[] = [];
  error = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.readWeatherDb();
  }

  openAddCityDialog() {
    let dialogRef = this.dialog.open(CityDialogComponent, {data: {mode: 'add'}});

    dialogRef.afterClosed().subscribe(result => {
      this.readWeatherDb();
    });
  }

  openRemoveCityDialog(city: string) {
    let dialogRef = this.dialog.open(CityDialogComponent, {data: {mode: 'remove', city}});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancelled') this.readWeatherDb();
    });
  }

  readWeatherDb() {
    if (localStorage.getItem('weatherDb') !== null) {
      const db = JSON.parse(localStorage.getItem('weatherDb'));
      const userId = JSON.parse(localStorage.getItem('activeUser')).id;
      this.usersWeatherData = db.filter(el => el.userId === userId);
    }
  }

}
