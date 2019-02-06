import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Urls } from '../common/urls';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/user.model';

/**
 * A service for fetching and setiing user information.
 */
@Injectable()
export class UserService {
  private serverUrl: string = Urls.serverUrl;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  // get user info as a User object
  // return Observable
  fetchUserInfo() {
    if (!this.authService.getAuthStatus()) {
      return ;
    }
    return this.http.get<{
      message: string,
      user: {
        userId: string,
        firstName: string,
        lastName: string,
        phone: string,
        schoolId: string,
        school: string,
        type: string
      }
      }>(this.serverUrl + '/userinfo');
  }

}
