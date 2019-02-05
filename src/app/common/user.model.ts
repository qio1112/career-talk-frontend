export class User {
  userId: string;
  firstname: string;
  lastname: string;
  phone: string;
  schoolId: string;
  school: string;
  type: string;

  constructor(userId: string, firstname: string, lastname: string, phone: string, schoolId: string, school: string, type: string) {
    this.userId = userId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.schoolId = schoolId;
    this.school = school;
    this.type = type;
  }
}
