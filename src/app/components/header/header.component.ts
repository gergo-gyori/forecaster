import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  appTitle = 'Forecaster';
  activeUser: User;
  activeUserSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
    this.activeUserSubscription = this.authService.activeUserChanged.subscribe(activeUser => {
      this.activeUser = activeUser;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.activeUserSubscription) {
      this.activeUserSubscription.unsubscribe();
    }
  }
}
