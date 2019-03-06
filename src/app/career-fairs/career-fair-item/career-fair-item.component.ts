import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CareerFair } from 'src/app/common/careerfair.model';
import { Router } from '@angular/router';
import { DateParser } from 'src/app/common/dateParser';


@Component({
  selector: 'app-career-fair-item',
  templateUrl: './career-fair-item.component.html',
  styleUrls: ['./career-fair-item.component.css']
})
export class CareerFairItemComponent implements OnInit, OnChanges {
  @Input() careerfair: CareerFair;
  date = <string>'';
  startTime = <string>'';
  endTime = <string>'';

  constructor(private router: Router) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.getTimes();
  }

  onLoadCompanies() {
    const careerfairId = this.careerfair._id;
    this.router.navigate(['/careerfairs', careerfairId, 'companies']);
  }

  private getTimes() {
    if (this.careerfair) {
      const startTime = new Date(this.careerfair.startTime);
      const endTime = new Date(this.careerfair.endTime);
      this.date = DateParser.parseDate(startTime).date;
      this.startTime = DateParser.parseDate(startTime).time;
      this.endTime = DateParser.parseDate(endTime).time;
    }
  }
}
