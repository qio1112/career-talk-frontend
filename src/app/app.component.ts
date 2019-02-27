import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Career Talk';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.autoLogin(); // auto login user if valid token exists in local storage
  }
}
