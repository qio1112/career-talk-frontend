import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/common/company.model';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.css']
})
export class CompanyFilterComponent implements OnInit, OnChanges {
  @Input() companies: Company[];
  @Output() filterChange: EventEmitter<{filterName: string, status: boolean, value: string}> = new EventEmitter();
  sponsor = false;
  fulltime = false;
  intern = false;
  freshman = false;
  juniorOrSenior = false;
  graduate = false;
  doctoral = false;
  majors = <string[]>[];
  selectedMajors = <string[]>[];

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.getMajorsFromCompanies();
  }

  onRemoveSelectedMajor(index: number) {
    this.filterChange.emit({filterName: 'selectedMajor', status: false, value: this.selectedMajors[index]});
    this.selectedMajors.splice(index, 1);
  }

  onAddSelectedMajor(index: number) {
    if (this.selectedMajors.findIndex(m => m === this.majors[index])) {
      this.filterChange.emit({filterName: 'selectedMajor', status: true, value: this.majors[index]});
      this.selectedMajors.push(this.majors[index]);
    }
  }

  // check box change events

  onSponsorChange(event: Event) {
    this.sponsor = !this.sponsor;
    this.filterChange.emit({filterName: 'sponsor', status: this.sponsor, value: null});
  }

  onFulltimeChange(event: Event) {
    this.fulltime = !this.fulltime;
    this.filterChange.emit({filterName: 'fulltime', status: this.fulltime, value: null});
  }

  onInternChange(event: Event) {
    this.intern = !this.intern;
    this.filterChange.emit({filterName: 'intern', status: this.intern, value: null});
  }

  onFreshmanChange(event: Event) {
    this.freshman = !this.freshman;
    this.filterChange.emit({filterName: 'freshman', status: this.freshman, value: null});
  }

  onJuniorOrSeniorChange(event: Event) {
    this.juniorOrSenior = !this.juniorOrSenior;
    this.filterChange.emit({filterName: 'juniorOrSenior', status: this.juniorOrSenior, value: null});
  }

  onGraduateChange(event: Event) {
    this.graduate = !this.graduate;
    this.filterChange.emit({filterName: 'graduate', status: this.graduate, value: null});
  }

  onDoctoralChange(event: Event) {
    this.doctoral = !this.doctoral;
    this.filterChange.emit({filterName: 'doctoral', status: this.doctoral, value: null});
  }

  private getMajorsFromCompanies() {
    const set = new Set();
    if (this.companies) {
      this.companies.forEach(company => {
          company.majors.forEach(major => {
            set.add(major.trim().toLowerCase());
          });
      });
      this.majors = Array.from(set);
    }
  }
}
