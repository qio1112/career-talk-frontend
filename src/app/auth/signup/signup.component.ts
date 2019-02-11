import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/app/common/school.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public schools: School[];

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService
  ) { }

  ngOnInit() {
    this.schoolService.getAllSchools()
      .subscribe(schoolsInfo => {
        this.schools = schoolsInfo.schools;
      });
  }

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
      form.value.type,
      form.value.selectedSchoolId
    );
  }
}
