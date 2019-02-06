import { Component, OnInit, Input } from '@angular/core';
import { CareerFair } from 'src/app/common/careerfair.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-career-fair-item',
  templateUrl: './career-fair-item.component.html',
  styleUrls: ['./career-fair-item.component.css']
})
export class CareerFairItemComponent implements OnInit {
  @Input() careerfair: CareerFair;

  constructor(private router: Router) { }

  ngOnInit() { }

  onLoadCompanies() {
    const careerfairId = this.careerfair._id;
    this.router.navigate(['/' + careerfairId, 'companies']);
  }
}
