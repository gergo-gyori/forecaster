import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  cities: City[] = [];

  constructor() { }

  addCity(cityName: string) {
    const cityId = (this.cities.length > 0) ? this.cities[this.cities.length - 1].cityId + 1 : 0;
    const city: City = {
      userId: JSON.parse(localStorage.getItem('activeUser')).id,
      cityId,
      city: cityName
    };
    this.cities.push(city);
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  removeCity(cityId: number) {
    this.fetchCities();
    const newCities = this.cities.filter(el => el.cityId !== cityId);
    localStorage.setItem('cities', JSON.stringify(newCities));
  }

  fetchCitiesByUserId(id: number): Observable<City[]> {
    this.fetchCities();
    return of(this.cities.filter(el => el.userId === id));
  }

  private fetchCities() {
    if (localStorage.getItem('cities') !== null) {
      this.cities = JSON.parse(localStorage.getItem('cities'));
    }
  }

}


