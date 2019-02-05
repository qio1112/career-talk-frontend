import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'src/app/common/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  @Input() careerfairName: string;
  @Input() companyInCf: {companyName: string, time: string, location: string};
  company: Company;

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.company = this.companyService.getCompanyByName(this.companyInCf.companyName);
    console.log(this.company.name);
  }

  // not completed
  onShowCompanyDetail() {
    this.router.navigate([]);
  }

}
