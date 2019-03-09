*Yipeng Zhao, Personal Project*
# CareerTalk Angular Front-end
## Project Overview
The career talk is a web application for college student users to get the information about career fairs happening in their schools and schedule talks of some chosen companies to reduce the time span of waiting in lines. Colleges can create school users to upload new career fairs with information of companies and talks.
Career talk is a MEAN stack RESTful application. This is the Angular front-end of the application. Click the [link](https://github.com/qio1112/career-talk-backend) to check the back-end.

## Getting started
[Angular CLI](https://github.com/angular/angular-cli#installation) is needed to run and modify this project. Use `npm install` to install relevant packages.

Run `ng serve` for a development server with default port number 4200 `http://localhost:4200`. To connect to the back-end server, a back-end url is needed. The default back-end server url is `http://localhost:3000` which stores at `src/app/common/urls.ts` as:
```
export class Urls {
  public static get serverUrl(): string { return 'http://localhost:3000'; }
}
```
Change the url if needed.

The career talk uses Google Maps api for displaying the location of career fairs. Therefore a Google Maps api-key is needed. Create a file called `api-keys.ts` at `src/app/api-keys.ts`:
```
export class ApiKeys {
  public static get googleMapsApiKey(): string { return '<YOUR API_KEY>'; }
}
```
Change `'<YOUR API_KEY>'` to your api-key to start the application.

## Introduction to files
### Components
- Auth  
The Auth folder `src/app/auth` contains SignupComponent and LoginComponent for authentication. These two components contains the forms of signing up and logging in pages.
- User  
The users folder `src/app/users` contains UserInfoComponent and UserInfoEditComponent for showing and editing user information. User can also upload and download resume pdf file on the page which contains the UserInfoComponent.
- NavBarComponent  
The NavBarComponent is the navigation bar of the application. It contains different buttons with different auth status (not logged in/logged in as student/logged in as school).
- CareerFairsComponent  
The CareerFairsComponent contains the information about the career fairs with companies in the user's college. A student user needs to log in to see the information.
- CompaniesComponent  
The CompaniesComponent contains the information about the companies in a certain career fair.
- TalksComponent  
The TalksComponent shows the talks of a company in a certain career fair or user scheduled talks in user information page, with function of scheduling or unscheduling.
- CreateCareerfairComponent  
The CreateCareerfairComponent is used for a school user to create new career fair in the app and add companies and talks to it.

### Services
Services are all in the folder `src/app/services`.
- AuthService  
The AuthService provides the functions of sending signing up and logging in http requests, store the JWT and other data for automatically signing in and logging out.
- Auth guards  
Two auth guards AuthAsSchoolGuard and AuthAsStudentGuard are used for protecting some routes for school user and student user respectively.
- CareerfairService, CompanyService, SchoolService
These three services provides the functions of fetching data from server and creating new data in database through HTTP requests.
- UserService  
The UserService provides the functions of fetching user information from server, scheduling and unscheduling talks, and edit user information through HTTP requests.

### Others
- common  
The folder `src/app/common` stores some basic data models mostly used for data transformation of HTTP requests.
- app-routing.module.ts  
`src/app/app-routing.module.ts` is stores the relation between routs and components.
