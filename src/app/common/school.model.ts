import { CareerFair } from './careerfair.model';

/**
 * model of schools
 */
export class School {
  _id: string;
  name: string;
  careerfairs: CareerFair[];
}
