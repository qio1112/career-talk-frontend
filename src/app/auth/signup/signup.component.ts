import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  // formBuider = new FormBuilder();

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      confirmPassword: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      major: new FormControl(null),
      phone: new FormControl(null),
      type: new FormControl(null, [Validators.required]),
      selectedSchoolId: new FormControl(null),
      schoolName: new FormControl(null)
    });
    this.form.get('type').valueChanges
      .subscribe(type => {
        if (type === 'student') {
          this.form.get('firstName').setValidators([Validators.required, Validators.maxLength(30)]);
          this.form.get('lastName').setValidators([Validators.required, Validators.maxLength(30)]);
          this.form.get('major').setValidators([Validators.required, Validators.maxLength(30)]);
          this.form.get('phone').setValidators([Validators.required, Validators.pattern(/\d*/)]);
          this.form.get('selectedSchoolId').setValidators([Validators.required]);
          this.form.get('schoolName').setValidators(null);
        } else if (type === 'school') {
          this.form.get('firstName').setValidators(null);
          this.form.get('lastName').setValidators(null);
          this.form.get('major').setValidators(null);
          this.form.get('phone').setValidators(null);
          this.form.get('selectedSchoolId').setValidators(null);
          this.form.get('schoolName').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(40)]);
        }
          this.form.get('firstName').updateValueAndValidity();
          this.form.get('lastName').updateValueAndValidity();
          this.form.get('major').updateValueAndValidity();
          this.form.get('phone').updateValueAndValidity();
          this.form.get('selectedSchoolId').updateValueAndValidity();
          this.form.get('schoolName').updateValueAndValidity();
       });
    this.schoolService.getAllSchools()
      .subscribe(schoolsInfo => {
        this.schools = schoolsInfo.schools;
      });
  }

  onSignUp() {
    if (this.form.value.type === 'student') {
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
    } else if (this.form.value.type === 'school') {
      this.authService.createUserAsSchool(
        this.form.value.email,
        this.form.value.password,
        this.form.value.schoolName
      );
    }
  }
}
