import { Component, OnInit } from '@angular/core';
import { CareerfairService } from '../services/careerfair.service';
import { CareerFair } from '../common/careerfair.model';

@Component({
  selector: 'app-career-fairs',
  templateUrl: './career-fairs.component.html',
  styleUrls: ['./career-fairs.component.css']
})
export class CareerFairsComponent implements OnInit {

  careerfairs: CareerFair[];

  constructor(
    private cfService: CareerfairService
  ) { }

  ngOnInit() {
    // find all career fairs while loading
    this.cfService.findCareerfairs()
      .subscribe(careerfairsInfo => {
        this.careerfairs = careerfairsInfo.careerfairs;
      });
  }
}
