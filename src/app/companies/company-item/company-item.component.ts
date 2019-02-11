import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'src/app/common/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';
import { CareerFair } from 'src/app/common/careerfair.model';
import { Talk } from 'src/app/common/talk.model';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  @Input() careerfair: CareerFair;
  @Input() company: Company;
  talks: Talk[];
  locationInCareerfair: string;

  constructor(
    private companyService: CompanyService,
  ) { }

  ngOnInit() {
    // load the talks, fetch the location from talks
    this.companyService.findTalks(this.careerfair._id, this.company._id)
      .subscribe(talksInfo => {
        this.talks = talksInfo.talks;
        this.locationInCareerfair = this.talks[0].location;
      });
  }
}
