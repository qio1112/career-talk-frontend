import { Company } from './company.model';
/**
 * model of career fairs
 */
export class CareerFair {
  public id: string;
  public schoolName: string;
  public name: string;
  public time: string;
  public address: string;
  public description: string;
  // companies is stored as the name of the company but not a company object
  // to get more info about the company, use company service to search for the company.
  public companies: {companyName: string, time: string, location: string}[];

  constructor(
      id: string,
      schoolName: string,
      name: string,
      time: string,
      address: string,
      description: string,
      companies: {companyName: string, time: string, location: string}[]
    ) {
    this.id = id;
    this.schoolName = schoolName;
    this.name = name;
    this.time = time;
    this.address = address;
    this.description = description;
    this.companies = companies;
  }
}
