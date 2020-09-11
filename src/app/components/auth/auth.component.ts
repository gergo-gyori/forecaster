import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  @ViewChild('f', { static: false }) loginForm: NgForm;
  passwordHidden = true;
  passwordShort = true;
  passwordValid = true;
  passwordSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.passwordSubscription = this.authService.passwordValid.subscribe(passwordValid => {
      this.passwordValid = passwordValid;
      console.log(this.passwordValid);
    });
  }

  onCheckPasswordLength() {
    this.passwordShort = this.loginForm.value.password.length > 3 || false;
  }

  onLogin() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
  }

  ngOnDestroy() {
    this.passwordSubscription.unsubscribe();
  }
}
