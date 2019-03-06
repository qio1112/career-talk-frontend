import { Component, OnInit } from '@angular/core';
import { Talk } from '../common/talk.model';

@Component({
  selector: 'app-create-careerfair',
  templateUrl: './create-careerfair.component.html',
  styleUrls: ['./create-careerfair.component.css']
})
export class CreateCareerfairComponent implements OnInit {
  minDate = new Date(Date.now());
  createStage = 1;
  addedCompanies = <{name: string, talks: {startTime: Date, endTime: Date}[]}[]>[];

  addedTalks = <{startTime: Date, endTime: Date}[]>[];
  constructor() { }

  ngOnInit() {
    this.addedCompanies.push({name: 'Test com', talks: [
      {startTime: new Date('2019-07-01T07:00:00'), endTime: new Date('2019-07-01T07:20:00')}
    ]});
    this.addedTalks.push({startTime: new Date('2019-07-01T07:00:00'), endTime: new Date('2019-07-01T07:20:00')});
    this.addedTalks.push({startTime: new Date('2019-07-01T07:00:00'), endTime: new Date('2019-07-01T07:20:00')});

  }

  onCreateCareerfair() {

  }

  onAddCompaniesAndTalks() {

  }

  onAddNewTalk() {

  }
}
