import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  users: User[] = [];

  constructor() {
    this.users = JSON.parse(localStorage.getItem('users'));
  }

  login(username: string, password: string) {
    const isUserRegistered = this.users.find(user => user.username === username);

    if (isUserRegistered) {
      console.log('user exists! go to weather page');
      // navigate user to his weather-forecast page
    } else {

      const id = (this.users.length > 0) ? this.users[this.users.length - 1].id + 1 : 0;

      const user: User = {
        id,
        username,
        password
      };

      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
    console.log(this.users);
  }

}
