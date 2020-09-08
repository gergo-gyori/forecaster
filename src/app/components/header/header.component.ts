import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  appTitle = 'Forecaster';
  activeUser: any;
  activeUserSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
    this.activeUserSubscription = this.authService.activeUserChanged.subscribe(activeUser => {
      this.activeUser = activeUser;
    });
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
  }

  ngOnDestroy() {
    this.activeUserSubscription.unsubscribe();
  }

}
