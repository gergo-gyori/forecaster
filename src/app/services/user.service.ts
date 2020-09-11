import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];

  constructor() { }

  createUser(username: string, password: string): User {
    const id = (this.users.length > 0) ? this.users[this.users.length - 1].id + 1 : 0;
    const user: User = {
      id,
      username,
      password
    };

    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return user;
  }

  fetchUsers(): Observable<User[]> {
    this.users = localStorage.getItem('users') !== null ? JSON.parse(localStorage.getItem('users')) : [];
    return of(this.users);
  }

}
