import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @ViewChild('f', { static: false }) loginForm: NgForm;
  passwordHidden = true;
  passwordValid = false;

  constructor(private authService: AuthService) { }

  onCheckPasswordLength() {
    this.passwordValid = this.loginForm.value.password.length > 3 || false;
  }

  onLogin() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username, password);
  }

}
