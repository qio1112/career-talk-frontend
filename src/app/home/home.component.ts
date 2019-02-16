import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SchoolService } from '../services/school.service';
import { Subscription } from 'rxjs';
import { School } from '../common/school.model';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../common/user.model';
import { Router } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private authListenerSubscription: Subscription;
  isAuthenticated = false;
  user = <User>{};

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // get the initial auth status
    this.isAuthenticated = this.authService.getAuthStatus();
    if (this.isAuthenticated) {
      this.fetchUserInfo();
    }
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
        this.fetchUserInfo();
      });
  }

  ngOnDestroy () {
    this.authListenerSubscription.unsubscribe();
  }

  onSelectSchool(form: NgForm) {
    const schoolId = form.value.selectedSchool;
    if (!this.authService.getAuthStatus()) {
      this.router.navigate(['/signup']);
    }
  }

  // get user info and save it
  private fetchUserInfo() {
    if (this.isAuthenticated) {
      this.userService.fetchUserInfo()
          .subscribe(userInfo => {
            this.user = userInfo.user;
        });
    }
  }

}
