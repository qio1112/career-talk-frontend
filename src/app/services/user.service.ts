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
  private user: User;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getUser() {
    if (!this.authService.getAuthStatus()) {
      return ;
    }
    this.http.get<{
      message: string,
      user: {
        userId: string,
        firstname: string,
        lastname: string,
        phone: string,
        schoolId: string,
        school: string,
        type: string
      }
      }>(this.serverUrl + '/userinfo')
      .subscribe(userInfo => {
        this.user = userInfo.user;
        return this.user;
      });
  }

}
