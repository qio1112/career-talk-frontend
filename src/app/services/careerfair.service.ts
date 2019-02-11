import { Injectable } from '@angular/core';
import { CareerFair } from '../common/careerfair.model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../common/urls';

@Injectable()
export class CareerfairService {

  private serverUrl = Urls.serverUrl;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  // get all careerfairs according to the logged in user
  findCareerfairs() {
    if (!this.authService.getAuthStatus()) {
      return ;
    }
    return this.http.get<{
      message: string,
      careerfairs: CareerFair[]
    }>(this.serverUrl + '/careerfairs');
  }
}
