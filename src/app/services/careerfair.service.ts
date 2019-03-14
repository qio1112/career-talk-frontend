import { Injectable } from '@angular/core';
import { CareerFair } from '../common/careerfair.model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../common/urls';
import { Company } from '../common/company.model';

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

  // get all different majors in the career fair
  findMajorsInCareerfair(careerfairId: string) {
    if (!this.authService.getAuthStatus()) {
      return ;
    }
    return this.http.get<{
      message: string,
      majors: string[]
    }>(this.serverUrl + '/careerfairs/' + careerfairId + '/majors');
  }

  // create a new careerfair
  createCareerfair(name: string, date: Date, location: string, description: string, start: Date, end: Date) {
    const dateTime = date.getTime();
    const startTime = start.getTime();
    const endTime = end.getTime();
    return this.http.post<{
      careerfair: CareerFair,
      message: string
    }>(this.serverUrl + '/careerfairs', {
      name: name,
      date: dateTime,
      location: location,
      description: description,
      startTime: startTime,
      endTime: endTime
    });
  }
}
