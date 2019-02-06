/**
 * model of users
 */
export class User {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  schoolId: string;
  school: string;
  type: string;

  constructor(userId: string, firstName: string, lastName: string, phone: string, schoolId: string, school: string, type: string) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.schoolId = schoolId;
    this.school = school;
    this.type = type;
  }
}
