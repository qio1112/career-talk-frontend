import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/app/common/school.model';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public schools: School[];
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      confirmPassword: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      firstName: new FormControl(null, {validators: [Validators.required, Validators.maxLength(20)]}),
      lastName: new FormControl(null, {validators: [Validators.required, Validators.maxLength(20)]}),
      major: new FormControl(null, {validators: [Validators.required]}),
      phone: new FormControl(null, {validators: [Validators.required, Validators.pattern(/\d*/)]}),
      type: new FormControl(null),
      selectedSchoolId: new FormControl(null)
    });
    this.schoolService.getAllSchools()
      .subscribe(schoolsInfo => {
        this.schools = schoolsInfo.schools;
      });
  }

  onSignUp() {
    this.authService.createUser(
      this.form.value.email,
      this.form.value.password,
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.major,
      this.form.value.phone,
      this.form.value.type,
      this.form.value.selectedSchoolId
    );
  }
}
