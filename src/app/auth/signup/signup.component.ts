import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public schools = ['University A', 'University B'];

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return ;
    }
    this.authService.createUser(
      form.value.email,
      form.value.password,
      form.value.firstName,
      form.value.lastName,
      form.value.phone,
      form.value.type
    );
  }
}
