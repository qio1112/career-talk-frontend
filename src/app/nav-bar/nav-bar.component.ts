import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../common/user.model';
import { Urls } from '../common/urls';

/**
 * the navigation bar
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  private authListenerSubscription: Subscription;
  private serverUrl = Urls.serverUrl;
  isAuthenticated = false;
  avatarPath = '';
  user = <User>{};

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // check if user logged in
    this.isAuthenticated = this.authService.getAuthStatus();
    if(this.isAuthenticated) {
      this.fetchUserInfo();
    }
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
        if(this.isAuthenticated) {
          this.fetchUserInfo();
        }
      });
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logoutUser();
  }

  private fetchUserInfo() {
    this.userService.fetchUserInfo()
      .subscribe(userInfo => {
        this.user = userInfo.user;
        this.avatarPath = this.serverUrl + '/' + this.user.avatarPath;
      });
  }
}
