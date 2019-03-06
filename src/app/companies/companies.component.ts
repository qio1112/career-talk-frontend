import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../common/company.model';
import { CareerFair } from '../common/careerfair.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  private careerfairId: string;
  companies: Company[];
  careerfair: CareerFair;
  private filterStatus = {
    sponsor: false,
    fulltime: false,
    intern: false,
    freshman: false,
    juniorOrSenior: false,
    graduate: false,
    doctoral: false,
    selectedMajor: <string[]>[]
  };

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // find companies in the careerfair
    this.careerfairId = this.route.snapshot.params['careerfairId'];
    this.companyService.findCompaniesByCareerfairId(this.careerfairId, this.createParams())
      .subscribe(companiesInfo => {
        this.companies = companiesInfo.companies;
        this.careerfair = companiesInfo.careerfair;
        console.log(this.careerfair);
      });
  }

  // when filter changes, send a new PUT request for filtered companies
  onFilterChange(event: {filterName: string, status: boolean, value: string}) {
    if (event.filterName === 'selectedMajor') {
      if (event.status) {
        this.filterStatus.selectedMajor.push(event.value);
      } else {
        const index = this.filterStatus.selectedMajor.findIndex(major => major === event.value);
        this.filterStatus.selectedMajor.splice(index, 1);
      }
    } else {
      this.filterStatus[event.filterName] = event.status;
    }
    this.companyService.findCompaniesByCareerfairId(this.careerfairId, this.createParams())
      .subscribe(companiesInfo => {
        this.companies = companiesInfo.companies;
      });
  }

  // create a new HttpParams from filterStatus
  private createParams() {
    let params = new HttpParams()
      .append('sponsor', this.filterStatus.sponsor ? 'true' : 'false')
      .append('fulltime', this.filterStatus.fulltime ? 'true' : 'false')
      .append('intern', this.filterStatus.intern ? 'true' : 'false')
      .append('freshman', this.filterStatus.freshman ? 'true' : 'false')
      .append('juniorOrSenior', this.filterStatus.juniorOrSenior ? 'true' : 'false')
      .append('graduate', this.filterStatus.graduate ? 'true' : 'false')
      .append('doctoral', this.filterStatus.doctoral ? 'true' : 'false');
    this.filterStatus.selectedMajor.forEach(major => {
      params = params.append('major', major);
    });
    // console.log(params);
    return params;
  }
}
