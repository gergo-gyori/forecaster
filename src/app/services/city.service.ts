import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  cities: City[] = [];

  constructor() { }

  addCity(cityName: string) {
    const city: City = {
      userId: JSON.parse(localStorage.getItem('activeUser')).id,
      city: cityName
    };
    this.cities.push(city);
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  removeCity(city: string) {
    this.fetchCities();
    const newCities = this.cities.filter(el => el.city !== city);
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

export interface City {
  userId: number;
  city: string;
}
