import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [];
  activeUser = '';
  activeUserChanged = new Subject<any>();

  constructor(private router: Router) {
      this.getUsers();
  }

  login(username: string, password: string) {

    const registeredUser = this.users.find(user => user.username === username);
    if (registeredUser) {

      if (registeredUser.password !== password) {
        console.log('Invalid password');
      } else {
        this.router.navigate(['weatherforecast']);
        localStorage.setItem('activeUser', JSON.stringify(registeredUser));
        this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
        this.activeUserChanged.next(this.activeUser);
      }

    } else {
      this.createUser(username, password);
      this.router.navigate(['weatherforecast']);
    }
  }

  createUser(username: string, password: string) {
    const id = (this.users.length > 0) ? this.users[this.users.length - 1].id + 1 : 0;
    const user: User = {
      id,
      username,
      password
    };
    this.persistUsers(user, this.users);
  }

  logout() {
    this.activeUser = '';
    localStorage.setItem('activeUser', JSON.stringify(this.activeUser));
    this.activeUserChanged.next(this.activeUser);
    this.router.navigate(['auth']);
  }

  persistUsers(user: User, users: User[]) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('activeUser', JSON.stringify(user));
    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));

    this.activeUserChanged.next(this.activeUser);
  }

  getUsers() {
    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
    this.users = localStorage.getItem('users') !== null ? JSON.parse(localStorage.getItem('users')) : [];
  }

  handleActiveUser() {
    this.activeUserChanged.subscribe(activeUser => {
      localStorage.setItem('activeUser', JSON.stringify(activeUser));
    });
  }

}
