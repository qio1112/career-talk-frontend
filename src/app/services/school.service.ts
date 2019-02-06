import { Injectable } from '@angular/core';
import { Urls } from '../common/urls';
import { HttpClient } from '@angular/common/http';
import { School } from '../common/school.model';

@Injectable()
export class SchoolService {
  private serverUrl = Urls.serverUrl;

  constructor(
    private http: HttpClient
  ) { }

  // get all schools for selection, no auth needed
  getAllSchools() {
    return this.http.get<{message: string, schools: School[]}>(this.serverUrl + '/schools');
  }
}
