import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-added-company',
  templateUrl: './added-company.component.html',
  styleUrls: ['./added-company.component.css']
})
export class AddedCompanyComponent implements OnInit {
  @Input() addedCompany: {name: string, talks: {startTime: Date, endTime: Date}[]};

  constructor() { }

  ngOnInit() {
  }

}
