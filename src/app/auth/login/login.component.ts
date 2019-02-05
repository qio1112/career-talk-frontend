import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogin(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    this.authService.loginUser(email, password);
  }

  onForgetPassword() {
    // router.navigate()
  }

}
