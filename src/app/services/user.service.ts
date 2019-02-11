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
  private serverUrl: string = Urls.serverUrl;
  private talkStatusListener = new Subject<{talkId: string, status: boolean}>();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  getTalkStatusListener() {
    return this.talkStatusListener;
  }

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

  scheduleTalk(talk: Talk) {
    return this.http.post<{message: string}>(this.serverUrl + '/scheduletalk', { talkId: talk._id })
      .pipe(result => {
        this.talkStatusListener.next({talkId: talk._id, status: true});
        return result;
      });
  }

  unscheduleTalk(talk: Talk) {
    return this.http.post(this.serverUrl + '/unscheduletalk', { talkId: talk._id })
      .pipe(result => {
        this.talkStatusListener.next({talkId: talk._id, status: false});
        return result;
      });
  }

}
