import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) loginForm: NgForm;
  passwordHidden = true;
  passwordShort = true;
  passwordValid = true;
  passwordSubscription: Subscription;
  activeUserSubscription: Subscription;
  activeUser: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));

    this.activeUserSubscription = this.authService.activeUserChanged.subscribe(activeUser => {
      this.activeUser = activeUser;
    });

    this.passwordSubscription = this.authService.passwordValid.subscribe(passwordValid => {
      this.passwordValid = passwordValid;
    });
  }

  isLoggedIn(): boolean {
    return this.activeUser !== null;
  }

  onCheckPasswordLength() {
    this.passwordShort = this.loginForm.value.password.length > 3 || false;
  }

  onLogin() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
  }

  onLogout() {
    this.authService.logout();
  }

  navigateToForecasts() {
    this.router.navigate(['/weatherforecast']);
  }

  ngOnDestroy() {
    if (this.passwordSubscription) {
      this.passwordSubscription.unsubscribe();
    }

    if (this.activeUserSubscription) {
      this.activeUserSubscription.unsubscribe();
    }
  }
}
