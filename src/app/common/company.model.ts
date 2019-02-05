/**
 * model of companies
 */
export class Company {
  id: string;
  name: string;
  address: string; // address of the company, not the location in any career fairs
  email:  string;
  description: string;
  imagePath: string;
  website: string;
  others: {};

  constructor(id: string, name: string, address: string, email: string, description: string, website: string, imagePath: string, others) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.email = email;
    this.imagePath = imagePath;
    this.others = others;
    this.website = website;
  }
}
