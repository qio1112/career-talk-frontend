import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Urls } from '../common/urls';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/user.model';
import { Talk } from '../common/talk.model';
import { Subject } from 'rxjs';

/**
 * A service for fetching and setiing user information.
 */
@Injectable()
export class UserService {
  private user: User;
  private serverUrl: string = Urls.serverUrl;
  private talkStatusListener = new Subject<{talkId: string, status: boolean}>();
  private userInformationChangeListener = new Subject<{message: string}>();

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

  getUserInformationChangeListener() {
    return this.userInformationChangeListener;
  }

  getTalkStatusListener() {
    return this.talkStatusListener;
  }

  // get user info as a User object
  // return Observable
  fetchUserInfo() {
    return this.http.get<{
        message: string,
        user: User
      }>(this.serverUrl + '/user');
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
  updateUserInfo(firstName: string, lastName: string, major: string, phone: string, schoolId: string) {
    return this.http.patch<{message: string}>(this.serverUrl + '/user/edit',
      {firstName: firstName, lastName: lastName, major: major, phone: phone, schoolId: schoolId});
  }

  // POST upload the resume
  uploadResume(file: File) {
    const formData = new FormData();
    formData.append('resume', file, file.name);
    return this.http.post<{
      message: string, path: string
    }>(this.serverUrl + '/user/upload/resume', formData);
  }

  // GET download uploaded resume
  downloadResume() {
    return this.http.get(this.serverUrl + '/user/download/resume', {responseType: 'blob'});
  }

  // PATCH update user photo
  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file, file.name);
    return this.http.patch<{
      message: string, path: string
    }>(this.serverUrl + '/user/upload/avatar', formData);
  }

}
