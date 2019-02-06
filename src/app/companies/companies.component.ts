import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CareerfairService } from '../services/careerfair.service';
import { CareerFair } from '../common/careerfair.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  careerfairId: string;
  careerfair: CareerFair;
  companies: {companyName: string, time: string, location: string}[];

  constructor(
    private companyService: CompanyService,
    private careerfairService: CareerfairService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.careerfairId = this.route.snapshot.params['careerfairId'];
  }
}
