import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Urls } from '../common/urls';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/user.model';
import { Talk } from '../common/talk.model';
import { Subject } from 'rxjs';
import { EmailValidator } from '@angular/forms';

/**
 * A service for fetching and setiing user information.
 */
@Injectable()
export class UserService {
  private user: User;
  private serverUrl: string = Urls.serverUrl;
  private talkStatusListener = new Subject<{talkId: string, status: boolean}>();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getTalkStatusListener() {
    return this.talkStatusListener;
  }

  // get user info as a User object
  // return Observable
  fetchUserInfo() {
    // if (!this.authService.getAuthStatus()) {
    //   return ;
    // }
    return this.http.get<{
        message: string,
        user: User
      }>(this.serverUrl + '/userinfo');
  }

  // POST request, schedule a talk
  scheduleTalk(talk: Talk) {
    return this.http.post<{message: string}>(this.serverUrl + '/scheduletalk', { talkId: talk._id })
      .pipe(result => {
        this.talkStatusListener.next({talkId: talk._id, status: true});
        return result;
      });
  }

  // POST request, unschedule a talk
  unscheduleTalk(talk: Talk) {
    return this.http.post<{ message: string}>(this.serverUrl + '/unscheduletalk', { talkId: talk._id })
      .pipe(result => {
        this.talkStatusListener.next({talkId: talk._id, status: false});
        return result;
      });
  }

  // GET request, get talks the user scheduled
  findScheduledTalks() {
    return this.http.get<{ message: string, talks: Talk[] }>(this.serverUrl + '/scheduledtalks');
  }

  // PATCH update user information
  updateUserInfo(firstName: string, lastName: string, phone: string, schoolId: string) {
    return this.http.patch<{message: string}>(this.serverUrl + '/userinfo/edit',
      {firstName: firstName, lastName: lastName, phone: phone, schoolId: schoolId});
  }

}
