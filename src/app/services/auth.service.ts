import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Urls } from '../common/urls';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private homeUrl = Urls.serverUrl; // server home url
  private token: string; // jwt
  private expiresIn: number; // token expires, milliseconds
  private userId: string; // mongodb id of current user
  private userType: string;
  private tokenTimer: any; // a timer for invalid the stored token
  private authStatusListener = new Subject<boolean>(); // listen to the status of login
  private isAuthenticated = false; // if user logged in

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getUserType() {
    return this.userType;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  // POST request to server to create new user as student
  createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    major: string,
    phone: string,
    type: string,
    schoolId: string
  ) {
    this.http.post<{message: string, result: string}>(this.homeUrl + '/signup/student',
      {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        major: major,
        phone: phone,
        type: type,
        schoolId: schoolId
      })
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/login']);
      }, error => {
        if (error.status === 422) {
          alert('Wrong user type');
        } else if (error.status === 500) {
          alert('Something wrong with the server happened, please try again later.');
        }
      });
  }

  // POST request create new user as school
  createUserAsSchool(
    email: string,
    password: string,
    school: string
  ) {
    this.http.post<{
      message: string,
      result: string
    }>(this.homeUrl + '/signup/school', {
      email: email,
      password: password,
      type: 'school',
      school: school
    }).subscribe(res => {
      console.log(res);
      this.router.navigate(['/login']);
    }, error => {
      if (error.status === 422) {
        alert('Wrong user type');
      } else if (error.status === 500) {
        alert('Something wrong with the server happened, please try again later.');
      }
    })
  }

  // POST request to send login info to server
  loginUser(email: string, password: string) {
    return this.http
      .post<{message: string, token: string, expiresIn: string, userId: string, userType: string}>
        (this.homeUrl + '/login', {email: email, password: password})
      .subscribe(res => {
        this.token = res.token;
        this.expiresIn = +res.expiresIn * 1000; // ms
        this.userId = res.userId;
        this.userType = res.userType;
        if (this.token) {
          const now = new Date();
          this.saveAuthToken(this.token, new Date(now.getTime() + this.expiresIn), this.userId, this.userType);
          this.setTokenTimer(this.expiresIn);
          this.authStatusListener.next(true); // logged in
          this.isAuthenticated = true;
          this.router.navigate(['/']);
        }
      }, error => {
        console.log(error);
        if (error.status === 401) {
          this.authStatusListener.next(false);
        }
      });
  }

  // user log out
  logoutUser() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.removeAuthtoken();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  // login autometically if there is valid token in local storage
  autoLogin() {
    const authTokenInfo = this.getTokenFromLocalStorage();
    if (!authTokenInfo) {
      return ;
    }
    const now = new Date();
    const expiresIn = authTokenInfo.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.expiresIn = expiresIn;
      this.setTokenTimer(this.expiresIn);
      this.token = authTokenInfo.token;
      this.userId = authTokenInfo.userId;
      this.userType = authTokenInfo.userType;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  // log out autometically after expiration
  private setTokenTimer(expiration: number) {
    this.tokenTimer = setTimeout(() => this.logoutUser(), expiration);
  }

  // save jwt in local storage
  private saveAuthToken(token: string, expiration: Date, userId: string, userType: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
  }

  // remove jwt in local storage
  private removeAuthtoken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
  }

  // get the stored token
  private getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');
    if (!token || !expiration || !userId || !userType) {
      return ;
    }
    return { token: token, expiration: new Date(expiration), userId: userId, userType: userType };
  }
}
