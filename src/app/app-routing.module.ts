import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { CareerFairsComponent } from './career-fairs/career-fairs.component';
import { CompaniesComponent } from './companies/companies.component';
import { Page404Component } from './page404/page404.component';
import { AuthGuard } from './services/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'search', component: SearchComponent },
  { path: 'careerfairs', component: CareerFairsComponent, canActivate: [AuthGuard]},
  { path: 'careerfairs/:careerfairId/companies', component: CompaniesComponent, canActivate: [AuthGuard]},
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
    AuthGuard
  ]
})

export class AppRoutingModule { }
