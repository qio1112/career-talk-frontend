import { Injectable, OnInit } from '@angular/core';
import { CareerFair } from '../common/careerfair.model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../common/urls';

@Injectable()
export class CareerfairService {

  private serverUrl = Urls.serverUrl;
  private schoolName: string;
  private schoolId: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient
  ) { }

  // get all careerfairs according to the logged in user
  fetchCareerfairs() {
    if (!this.authService.getAuthStatus()) {
      return ;
    }
    return this.http.get<{
      message: string,
      careerfairs: CareerFair[]
    }>(this.serverUrl + '/careerfairs');
  }
}
