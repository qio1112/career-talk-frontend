import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { DateParser } from 'src/app/common/dateParser';

@Component({
  selector: 'app-added-company',
  templateUrl: './added-company.component.html',
  styleUrls: ['./added-company.component.css']
})
export class AddedCompanyComponent implements OnInit, OnChanges {
  @Input() addedCompany: {
      name: string,
      address: string,
      website: string,
      description: string,
      majors: string,
      email: string,
      talks: {startTime: Date, endTime: Date, location: string}[]}
    | {
      _id: string,
      name: string,
      talks: {startTime: Date, endTime: Date, location: string}[]
    };

  talks = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.talks = this.addedCompany.talks.map(talk => {
      const talkToShow = {
        startTime: DateParser.parseDate(talk.startTime).timeString,
        endTIme: DateParser.parseDate(talk.endTime).timeString
      }
      return talkToShow;
    });
  }
}
