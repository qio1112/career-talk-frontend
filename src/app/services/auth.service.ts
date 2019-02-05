import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Urls } from '../common/urls';

@Injectable()
export class AuthService {
  private homeUrl = Urls.serverUrl; // server home url
  private token: string; // jwt
  private expiresIn: number; // token expires, milliseconds
  private userId: string; // mongodb id of current user
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

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  // POST request to server to create new user
  createUser(email: string, password: string, firstName: string, lastName: string, phone: string, type: string) {
    this.http.post<{message: string, result: string}>(this.homeUrl + '/signup',
      {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        phone: phone,
        type: type
      })
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/login']);
      });
  }

  // POST request to send login info to server
  loginUser(email: string, password: string) {
    this.http
      .post<{message: string, token: string, expiresIn: string, userId: string}>
        (this.homeUrl + '/login', {email: email, password: password})
      .subscribe(res => {
        this.token = res.token;
        this.expiresIn = +res.expiresIn * 1000; // ms
        this.userId = res.userId;
        if (this.token) {
          const now = new Date();
          this.saveAuthToken(this.token, new Date(now.getTime() + this.expiresIn), this.userId);
          this.setTokenTimer(this.expiresIn);
          this.authStatusListener.next(true); // logged in
          this.isAuthenticated = true;
          this.router.navigate(['/']);
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
    const authToken = this.getTokenFromLocalStorage();
    if (!authToken) {
      return ;
    }
    const now = new Date();
    const expiresIn = authToken.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      console.log('token is here!' + expiresIn);
      this.expiresIn = expiresIn;
      this.setTokenTimer(this.expiresIn);
      this.token = authToken.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  // log out autometically after expiration
  private setTokenTimer(expiration: number) {
    this.tokenTimer = setTimeout(() => this.logoutUser(), expiration);
  }

  // save jwt in local storage
  private saveAuthToken(token: string, expiration: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
    localStorage.setItem('userId', userId);
  }

  // remove jwt in local storage
  private removeAuthtoken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  // get the stored token
  private getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expiration || !userId) {
      return ;
    }
    console.log(token);
    return { token: token, expiration: new Date(expiration), userId: userId };
  }
}
