/**
 * model of users
 */
export class User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  schoolId: string;
  school: string;
  type: string;

  constructor(userId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone: string,
      schoolId: string,
      school: string,
      type: string) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.schoolId = schoolId;
    this.school = school;
    this.type = type;
  }
}
