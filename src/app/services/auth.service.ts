import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  users: User[] = [];
  activeUser: any;
  activeUserChanged = new Subject<any>();

  constructor() {
    this.getUsers();
  }

  login(username: string, password: string) {
    const registeredUser = this.users.find(user => user.username === username);

    if (registeredUser) {
      registeredUser.password !== password ? console.log('Invalid password') : console.log('navigate to my weather page');
      this.activeUserChanged.next(this.activeUser);

    } else {
      // Refactor into function
      const id = (this.users.length > 0) ? this.users[this.users.length - 1].id + 1 : 0;
      const user: User = {
        id,
        username,
        password
      };
      this.persistUsers(user, this.users);
      // navigate to my weather profile
    }
  }

  logout() {
    this.activeUser = '';
    localStorage.setItem('activeUser', JSON.stringify(this.activeUser));
    this.activeUserChanged.next(this.activeUser);
  }

  persistUsers(user: User, users: User[]) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('activeUser', JSON.stringify(user));
    this.activeUserChanged.next(this.activeUser);
  }

  getUsers() {
    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
    this.users = JSON.parse(localStorage.getItem('users'));
  }

}
