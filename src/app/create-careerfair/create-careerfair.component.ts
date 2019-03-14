import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../common/company.model';
import { FormGroup, FormControl, Validators, AbstractControl, NgForm } from '@angular/forms';
import { CareerFair } from '../common/careerfair.model';
import { CareerfairService } from '../services/careerfair.service';
import { SchoolService } from '../services/school.service';
import { CompanyService } from '../services/company.service';
import { forkJoin } from 'rxjs';
import { DateParser } from '../common/dateParser';

@Component({
  selector: 'app-create-careerfair',
  templateUrl: './create-careerfair.component.html',
  styleUrls: ['./create-careerfair.component.css']
})
export class CreateCareerfairComponent implements OnInit {
  @ViewChild('addCompany') companyForm: NgForm;
  @ViewChild('addTalk') talkForm: NgForm;
  // min date of new career fair which is today
  minDate = new Date(Date.now());
  // stage of creation, stage 0 is creating careerfair, stage 1 is adding companies and talks.
  createStage = 0;

  // NEW companies which has been added to front-end
  addedNewCompanies = <{
    name: string,
    address: string,
    website: string,
    description: string,
    majors: string,
    email: string,
    talks: {startTime: Date, endTime: Date, location: string}[]
  }[]> [];

  // existing companies which has been added to front-end
  addedExistingCompanies = <{
    _id: string,
    name: string,
    talks: {startTime: Date, endTime: Date, location: string}[]
  }[]>[];
  // existing companies in DB for selection
  existingCompanies: Company[];

  // form for stage 0, new career fair
  createCareerfairForm: FormGroup;
  // form for stage 1, add new company
  addCompanyForm: FormGroup;
  // form for stage 1, add new talk
  addTalkForm: FormGroup;
  // talks which has been added to current editing company
  addedTalks = <{startTime: Date, endTime: Date, location: string}[]>[];
  // talks added with format easier to show
  addedTalksToShow = <{startTime: string, endTime: string, location: string}[]>[];
  // newly created careerfair, update after stage 0
  careerfair: CareerFair;

  // save the start and end time of the career fair for the limitation of times of talks
  private cfStartTime: string;
  private cfEndTime: string;
  private date: Date;

  constructor(
    private careerfairService: CareerfairService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    // get existing companies from db

    // init forms
    this.createCareerfairForm = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      date: new FormControl(null, {validators: [Validators.required]}),
      location: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.required, Validators.maxLength(300)]}),
      startTime: new FormControl(null, {validators: [Validators.required]}),
      endTime: new FormControl(null, {validators: [Validators.required]})
    }, {validators: [this.validStartAndEndTime]});

    this.addCompanyForm = new FormGroup({
      companyId: new FormControl(null, {validators: [Validators.required]}),
      name: new FormControl(null),
      address: new FormControl(null),
      website: new FormControl(null),
      description: new FormControl(null),
      majors: new FormControl(null),
      email: new FormControl(null, {validators: [Validators.email]})
    });

    this.addTalkForm = new FormGroup({
      startTime: new FormControl(null, {validators: [Validators.required]}),
      endTime: new FormControl(null, {validators: [Validators.required]}),
      location: new FormControl(null, {validators: [Validators.required]})
    }, {validators: [this.validStartAndEndTime, this.validTalkTime.bind(this)]});

    this.companyService.getAllExistingCompanies()
      .subscribe(companiesInfo => {
        this.existingCompanies = companiesInfo.companies;
      });
  }

  //  http request for creating a new career fair for stage 0, change stage to stage 1.
  onCreateCareerfair() {
    const name = this.createCareerfairForm.get('name').value;
    const date = new Date(this.createCareerfairForm.get('date').value);
    const startTimeParts = this.createCareerfairForm.get('startTime').value.split(':');
    const endDateParts = this.createCareerfairForm.get('endTime').value.split(':');
    // store the date, start and end times
    this.date = date;
    this.cfStartTime = this.createCareerfairForm.get('startTime').value;
    this.cfEndTime = this.createCareerfairForm.get('endTime').value;
    const startTime = new Date(date.getTime());
    const endTime = new Date(date.getTime());
    const description = this.createCareerfairForm.get('description').value;
    startTime.setHours(+startTimeParts[0], +startTimeParts[1]);
    endTime.setHours(+endDateParts[0], +endDateParts[1]);
    const location = this.createCareerfairForm.get('location').value;
    this.careerfairService.createCareerfair(name, date, location, description, startTime, endTime)
        .subscribe(result => {
          this.careerfair = result.careerfair;
          this.createStage = 1; // should be put in subscription
        });
  }

  // add new company to memory
  onAddNewCompany() {
    if (this.addCompanyForm.get('companyId').value === 0) {
      this.addedNewCompanies.push({
        name: this.addCompanyForm.get('name').value,
        address: this.addCompanyForm.get('address').value,
        website: this.addCompanyForm.get('website').value,
        description: this.addCompanyForm.get('description').value,
        majors: this.addCompanyForm.get('majors').value,
        email: this.addCompanyForm.get('email').value,
        talks: this.addedTalks.slice()
      });
    } else {
      const _id = this.addCompanyForm.get('companyId').value;
      this.addedExistingCompanies.push({
        _id: _id,
        name: this.existingCompanies.find(c => c._id === _id).name,
        talks: this.addedTalks.slice()
      });
    }
    this.addCompanyForm.reset();
    this.companyForm.resetForm();
    this.addedTalks = [];
    this.addedTalksToShow = [];
  }

  // add new talk to the new company in memory
  onAddNewTalk() {
    const startTime = this.createTimeDate(this.addTalkForm.get('startTime').value);
    const endTime = this.createTimeDate(this.addTalkForm.get('endTime').value);
    const location = this.addTalkForm.get('location').value;
    this.addedTalks.push({startTime: startTime, endTime: endTime, location: location});
    this.addedTalksToShow.push({
      startTime: DateParser.parseDate(startTime).timeString,
      endTime: DateParser.parseDate(endTime).timeString,
      location: location
    });
    this.addTalkForm.reset();
    this.talkForm.resetForm();
  }

  // http request for creating new companies and talks.
  onAddCompaniesAndTalks() {
    const careerfairId = this.careerfair._id;
    const combined = forkJoin(
      this.companyService.addTalksWithExistingCompanies(careerfairId, this.addedExistingCompanies),
      this.companyService.createNewCompaniesWithTalks(careerfairId, this.addedNewCompanies)
    );
    combined.subscribe(result => {
      console.log(result);
    });
  }

  // validator for checking if endTime is earlier than startTime
  private validStartAndEndTime(control: AbstractControl) {
    if (!control.get('startTime').value || !control.get('endTime').value) {
      return null;
    }
    const startTime = control.get('startTime').value;
    const endTime = control.get('endTime').value;
    return startTime >= endTime ? { 'invalidStartAndEndTime': true} : null;
  }

  // validator for checking if times of a talk are inside the career talk time
  private validTalkTime(control: AbstractControl) {
    if (!control.get('startTime').value || !control.get('endTime').value) {
      return null;
    }
    const startTime = control.get('startTime').value;
    const endTime = control.get('endTime').value;
    if (startTime > this.cfEndTime || startTime < this.cfStartTime || endTime < this.cfStartTime || endTime > this.cfEndTime) {
      return {'invalidTalkTime': true};
    } else {
      return null;
    }
  }

  // create a Date using this.date and input time string like "10:23"
  private createTimeDate(timeString: string) {
    const timeParts = timeString.split(':');
    const date = new Date(this.date.getTime());
    date.setHours(+timeParts[0], +timeParts[1]);
    return date;
  }
}
