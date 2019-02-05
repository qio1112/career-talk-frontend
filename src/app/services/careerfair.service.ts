import { Injectable } from '@angular/core';
import { CareerFair } from '../common/careerfair.model';
import { Company } from '../common/company.model';

@Injectable()
export class CareerfairService {

  private careerfairs: CareerFair[] = [
    new CareerFair(
      '1',
      'The First University',
      'The first career fair',
      '12:00-15:00',
      '100 First Street',
      'This is the first career fair for testing use. This is the description.',
      [
        {companyName: 'Company A', time: '12:00-13:00', location: 'Table 1'},
        {companyName: 'Company B', time: '13:00-14:00', location: 'Table 2'},
      ],
    ),
    new CareerFair(
      '2',
      'The First University',
      'The second career fair',
      '13:00-15:00',
      '200 First Street',
      'This is the second career fair for testing use. This is the description.',
      [
        {companyName: 'Company C', time: '12:00-13:00', location: 'Table 1'},
        {companyName: 'Company B', time: '13:00-14:00', location: 'Table 2'},
      ],
    ),
    new CareerFair(
      '3',
      'The Second University',
      'The second career fair',
      '11:00-14:00',
      '200 First Street',
      'This is the second career fair for testing use. This is the description.',
      [
        {companyName: 'Company C', time: '12:00-13:00', location: 'Table 1'},
        {companyName: 'Company D', time: '13:00-14:00', location: 'Table 2'},
      ],
    )
  ];
  constructor() { }

  getCareerfairs() {
    return this.careerfairs.slice();
  }

  getCareerfairById(id: string) {
    return this.careerfairs.slice().find(e => e.id === id);
  }

  getCareerfairByName(name: string) {
    return this.careerfairs.slice().find(e => e.name === name || e.name.split(' ').join('') === name);
  }

  getCareerFairsBySchoolName(schoolName: string) {
    return this.careerfairs.slice().filter(e => e.schoolName === schoolName);
  }
}
