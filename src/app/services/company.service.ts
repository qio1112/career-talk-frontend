import { Injectable } from '@angular/core';
import { Company } from '../common/company.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CompanyService {

  private companies = [
    new Company('1', 'Company A', '1 First Street', 'companyA@test.com', 'This is the first company.', 'firstcompany.com', '', ''),
    new Company('1', 'Company B', '2 First Street', 'companyB@test.com', 'This is the second company.', 'secondcompany.com', '', ''),
    new Company('1', 'Company C', '3 First Street', 'companyC@test.com', 'This is the third company.', 'thirdcompany.com', '', ''),
    new Company('1', 'Company D', '4 First Street', 'companyD@test.com', 'This is the fourth company.', 'fourthcompany.com', '', '')
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCompanyByName(name: string) {
    return this.companies.find(e => e.name === name);
  }

  getCompanies() { }

  getCompanyById() { }

  getTalks() { }

}
