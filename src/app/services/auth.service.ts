import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  users: User[];
  activeUserChanged = new Subject<any>();
  passwordValid = new Subject<boolean>();
  userSubscription: Subscription;

  constructor(private router: Router, private userService: UserService) {
    this.userSubscription = this.userService.fetchUsers().subscribe(users => { this.users = users; });
  }

  login(username: string, password: string) {
    let registeredUser = this.users.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (registeredUser && registeredUser.password !== password) {
      this.passwordValid.next(false);
      return;
    }

    if (!registeredUser) { registeredUser = this.userService.createUser(username, password); }

    localStorage.setItem('activeUser', JSON.stringify(registeredUser));
    this.activeUserChanged.next(registeredUser);
  }

  logout() {
    localStorage.setItem('activeUser', JSON.stringify(null));
    this.activeUserChanged.next(null);
    this.router.navigate(['auth']);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
