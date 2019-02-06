import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SchoolService } from '../services/school.service';
import { Subscription } from 'rxjs';
import { School } from '../common/school.model';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../common/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private authListenerSubscription: Subscription;
  schools: School[];
  isAuthenticated = false;
  hasSchool = false;
  user: User;

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService,
    private userService: UserService
  ) { }

  onSelectSchool(form: NgForm) {
    const schoolId = form.value.selectedSchool;
  }

  ngOnInit() {
    // get the initial auth status
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
        if (!authStatus) {
          this.hasSchool = false;
        }
      });
    // if logged in, check if the user has selected a school
    if (this.isAuthenticated) {
      this.userService.fetchUserInfo()
        .subscribe(userInfo => {
          this.user = userInfo.user;
          console.log(this.user);
          if (this.isAuthenticated && this.user.school) {
            this.hasSchool = true;
          }
        });
    }
    if (!this.hasSchool) {
      // get all schools
      this.schoolService.getAllSchools()
      .subscribe(schoolsInfo => {
        this.schools = schoolsInfo.schools;
      });
    }
  }

  ngOnDestroy () {
    this.authListenerSubscription.unsubscribe();
  }

}
