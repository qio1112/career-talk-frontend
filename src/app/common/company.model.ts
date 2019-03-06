/**
 * model of companies
 */
export class Company {
  _id: string;
  name: string;
  address: string; // address of the company, not the location in any career fairs
  email:  string;
  description: string;
  imagePath: string;
  website: string;
  majors: string[];
  sponsor: boolean;
  fulltime: boolean;
  intern: boolean;
  year: string[];
}
