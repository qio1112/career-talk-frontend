import { Company } from './company.model';
/**
 * model of career fairs
 */
export class CareerFair {
  _id: string;
  name: string;
  schoolId: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  startTime: string;
  endTime: string;
  talkIds: string[];
  companyIds: string[];
}
