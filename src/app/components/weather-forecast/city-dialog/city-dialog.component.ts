import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { City, CityService } from 'src/app/services/city.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.scss']
})
export class CityDialogComponent implements OnDestroy{
  cities: City[];
  invalidCity = false;
  weatherSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private weatherService: WeatherService,
    private cityService: CityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onAddCity(city: string) {
    // Check if given city is found by the API
    this.weatherSubscription = this.weatherService.fetchCurrentWeather(city).subscribe(success => {

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

  ngOnDestroy(){
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
