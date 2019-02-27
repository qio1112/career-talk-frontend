import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/common/user.model';
import { School } from 'src/app/common/school.model';
import { SchoolService } from 'src/app/services/school.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.css']
})
export class UserInfoEditComponent implements OnInit {
  oldUser = <User>{};
  schools = <School[]>[];
  private newUser = <User>{};

  constructor(
    private userService: UserService,
    private schoolService: SchoolService
  ) { }

  ngOnInit() {
    this.userService.fetchUserInfo()
      .subscribe(userInfo => {
        this.oldUser = userInfo.user;
      });
    this.schoolService.getAllSchools()
      .subscribe(schoolsInfo => {
        this.schools = schoolsInfo.schools;
        console.log(this.schools);
      });
  }

  // PATCH http request, update user information
  onEditUserInfo(form: NgForm) {
    const newFirstName = form.value.firstName;
    const newLastName = form.value.lastName;
    const newMajor = form.value.major;
    const newPhone = form.value.phone;
    const newSchoolId = form.value.selectedSchoolId;
    console.log(form.value.firstName);
    this.userService.updateUserInfo(newFirstName, newLastName, newMajor, newPhone, newSchoolId)
      .subscribe(result => {
        console.log(result);
      });
  }

}
