import { Company } from './company.model';
/**
 * model of career fairs
 */
export class CareerFair {
  _id: string;
  name: string;
  schoolId: string;
  address: string;
  description: string;
  startTime: Date;
  endTime: Date;
  talkIds: string[];
  companyIds: string[];
}
