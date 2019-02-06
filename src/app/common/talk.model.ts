/**
 * model of talks
 */
export class Talk {
  careerfair: string;
  company: string;
  startTime: Date;
  endTime: Date;
  scheduled: boolean;

  constructor(careerfair: string, company: string, startTime: Date, endTime: Date, scheduled: boolean) {
    this.careerfair = careerfair,
    this.company = company,
    this.startTime = startTime,
    this.endTime = endTime,
    this.scheduled = scheduled;
  }
}
