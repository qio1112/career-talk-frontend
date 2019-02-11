import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../common/company.model';
import { CareerFair } from '../common/careerfair.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  private careerfairId: string;
  companies: Company[];
  careerfair: CareerFair;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // find companies in the careerfair
    this.careerfairId = this.route.snapshot.params['careerfairId'];
    this.companyService.findCompaniesByCareerfairId(this.careerfairId)
      .subscribe(companiesInfo => {
        this.companies = companiesInfo.companies;
        this.careerfair = companiesInfo.careerfair;
      });
  }
}
