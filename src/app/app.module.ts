import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatRadioModule,
         MatSelectModule,
         MatToolbarModule,
         MatProgressSpinnerModule,
         MatExpansionModule,
         MatTabsModule,
         MatListModule,
         MatCheckboxModule,
         MatIconModule,
         MatDatepickerModule,
         MatNativeDateModule} from '@angular/material';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SearchComponent } from './search/search.component';
import { CareerFairItemComponent } from './career-fairs/career-fair-item/career-fair-item.component';
import { CompanyItemComponent } from './companies/company-item/company-item.component';
import { HomeComponent } from './home/home.component';
import { CompaniesComponent } from './companies/companies.component';
import { CareerFairsComponent } from './career-fairs/career-fairs.component';
import { CareerfairService } from './services/careerfair.service';
import { CompanyService } from './services/company.service';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { UserInfoEditComponent } from './users/user-info-edit/user-info-edit.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { Page404Component } from './page404/page404.component';
import { UserService } from './services/user.service';
import { SchoolService } from './services/school.service';
import { TalksComponent } from './talks/talks.component';
import { TalkItemComponent } from './talks/talk-item/talk-item.component';
import { ResumeUploadComponent } from './users/user-info/resume-upload/resume-upload.component';
import { CompanyFilterComponent } from './companies/company-filter/company-filter.component';
import { AgmCoreModule } from '@agm/core';
import { CreateCareerfairComponent } from './create-careerfair/create-careerfair.component';
import { AddedCompanyComponent } from './create-careerfair/added-company/added-company.component';
import { ApiKeys } from './api-keys';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    CareerFairItemComponent,
    CompanyItemComponent,
    HomeComponent,
    CompaniesComponent,
    CareerFairsComponent,
    UserInfoComponent,
    UserInfoEditComponent,
    Page404Component,
    TalksComponent,
    TalkItemComponent,
    ResumeUploadComponent,
    CompanyFilterComponent,
    CreateCareerfairComponent,
    AddedCompanyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: ApiKeys.googleMapsApiKey;
    }),
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTabsModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [
    CareerfairService,
    CompanyService,
    UserService,
    AuthService,
    SchoolService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
