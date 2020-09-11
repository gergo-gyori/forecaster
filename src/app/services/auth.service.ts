import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[];
  activeUserChanged = new Subject<any>();
  passwordValid = new Subject<boolean>();

  constructor(private router: Router, private userService: UserService) {
    this.userService.fetchUsers().subscribe(users => { this.users = users; });
  }

  login(username: string, password: string) {
    let registeredUser = this.users.find(user => user.username === username);
    if (registeredUser && registeredUser.password !== password) {
      this.passwordValid.next(false);
      return;
    }

    if (!registeredUser) { registeredUser = this.userService.createUser(username, password); }

    localStorage.setItem('activeUser', JSON.stringify(registeredUser));
    this.activeUserChanged.next(registeredUser);
    this.router.navigate(['weatherforecast']);
  }

  logout() {
    localStorage.setItem('activeUser', JSON.stringify(null));
    this.activeUserChanged.next(null);
    this.router.navigate(['auth']);
  }

}
