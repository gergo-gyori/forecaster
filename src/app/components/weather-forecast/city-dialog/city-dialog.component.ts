import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { City, CityService } from 'src/app/services/city.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.scss']
})
export class CityDialogComponent {
  cities: City[];
  invalidCity = false;

  constructor(
    private dialog: MatDialog,
    private weatherService: WeatherService,
    private cityService: CityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onAddCity(city: string) {
    // Check if given city is found by the API
    this.weatherService.fetchCurrentWeather(city).subscribe(success => {

      this.cityService.addCity(city);
      this.dialog.closeAll();
    }, error => {
      this.invalidCity = true;
    });
  }

  onRemoveCity(city: string) {
    this.cityService.removeCity(city);
    this.dialog.closeAll();
  }
}
