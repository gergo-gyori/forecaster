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


  constructor(
    private dialog: MatDialog,
    private weatherService: WeatherService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
  }

  onAddCity(city: string) {
    this.weatherService.fetchCurrentWeather(city).subscribe(weatherData => {

      // save data
      this.dialog.closeAll();
    }, error => {
      this.invalidCity = true;
    });
  }

  onRemoveCity(city: string) {
    this.dialog.closeAll();
  }
}
