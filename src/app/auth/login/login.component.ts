import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private authStatusSubscription: Subscription;
  wrongEmailPasswordCombination = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.email, Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    });
    this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(status => {
      this.wrongEmailPasswordCombination = !status;
    });
  }

  onLogin() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.loginUser(email, password);
  }

  onForgetPassword() {
    // router.navigate()
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }
}
