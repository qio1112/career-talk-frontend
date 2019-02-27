import { Injectable } from '@angular/core';
import { Company } from '../common/company.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Urls } from '../common/urls';
import { CareerFair } from '../common/careerfair.model';
import { Talk } from '../common/talk.model';
import { map } from 'rxjs/operators';

@Injectable()
export class CompanyService {

  private serverUrl = Urls.serverUrl;
  private companies: Company[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // get the companies stored
  getCompanies() {
    return this.companies;
  }

  // get companies in the certain career fair
  findCompaniesByCareerfairId(cfId: string, params: HttpParams) {
    return this.http.get<{
        message: string,
        companies: Company[],
        careerfair: CareerFair
      }>(this.serverUrl + '/careerfairs/' + cfId + '/companies', {params: params})
      .pipe(
        map(companiesInfo => {
          this.companies = companiesInfo.companies;
          return companiesInfo;
        })
      );
  }

  // find all talks according to the career fair id and company id
  findTalks(cfId: string, companyId: string) {
    return this.http.get<{
      message: string,
      talks: Talk[]
    }>(this.serverUrl + '/careerfairs/' + cfId + '/companies/' + companyId + '/talks');
  }

}
