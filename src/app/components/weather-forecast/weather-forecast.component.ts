import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { City, CityService } from 'src/app/services/city.service';
import { CityDialogComponent } from './city-dialog/city-dialog.component';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit, OnDestroy {
  usersCities: City[] = [];
  error = false;
  tabIndex = 0;
  citySubscription: Subscription;

  constructor(public dialog: MatDialog, private cityService: CityService) { }

  ngOnInit() {
    this.getCitiesByUserId();
  }

  getCitiesByUserId() {
    const id = JSON.parse(localStorage.getItem('activeUser')).id;
    this.citySubscription = this.cityService.fetchCitiesByUserId(id).subscribe(filteredCities => {
      console.log(filteredCities);
      this.usersCities = filteredCities;
    });
  }

  openAddCityDialog() {
    let dialogRef = this.dialog.open(CityDialogComponent, { data: { mode: 'add' } });
    dialogRef.afterClosed().subscribe(result => {
      this.getCitiesByUserId();
    });
  }

  openRemoveCityDialog(city: string) {
    let dialogRef = this.dialog.open(CityDialogComponent, { data: { mode: 'remove', city } });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancelled') {
        this.getCitiesByUserId();
      }
    });
  }

  handleError(error: boolean) {
    this.error = error;
  }

  // Only call the correct API on the current tab index
  tabChange(index) {
    this.error = false; // Resetting error to be able to recall the API after a potential API error has occurred
    this.tabIndex = index;
  }

  ngOnDestroy() {
    if (this.citySubscription) {
      this.citySubscription.unsubscribe();
    }
  }
}
