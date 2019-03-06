import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { CareerFairsComponent } from './career-fairs/career-fairs.component';
import { CompaniesComponent } from './companies/companies.component';
import { Page404Component } from './page404/page404.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { UserInfoEditComponent } from './users/user-info-edit/user-info-edit.component';
import { CreateCareerfairComponent } from './create-careerfair/create-careerfair.component';

import { AuthAsStudentGuard } from './services/auth-as-student.guard';
import { AuthAsSchoolGuard } from './services/auth-as-school.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'search', component: SearchComponent },
  { path: 'careerfairs', component: CareerFairsComponent, canActivate: [AuthAsStudentGuard]},
  { path: 'careerfairs/:careerfairId/companies', component: CompaniesComponent, canActivate: [AuthAsStudentGuard]},
  { path: 'careerfairs/:createcareerfair', component: CreateCareerfairComponent, canActivate: [AuthAsSchoolGuard]},
  { path: 'userinfo', component: UserInfoComponent, canActivate: [AuthAsStudentGuard]},
  { path: 'userinfo/edit', component: UserInfoEditComponent, canActivate: [AuthAsStudentGuard]},
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthAsStudentGuard,
    AuthAsSchoolGuard
  ]
})

export class AppRoutingModule { }
