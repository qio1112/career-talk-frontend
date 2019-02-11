/**
 * model of talks
 */
export class Talk {
  _id: string;
  careerfair: string;
  company: string;
  startTime: Date;
  endTime: Date;
  scheduled: boolean;
  scheduledBy: string;
  location: string;

  constructor(
      _id: string,
      careerfair: string,
      company: string, startTime: Date,
      endTime: Date, scheduled: boolean,
      scheduledBy: string,
      location: string) {
    this._id = _id;
    this.careerfair = careerfair;
    this.company = company;
    this.startTime = startTime;
    this.endTime = endTime;
    this.scheduled = scheduled;
    this.scheduledBy = scheduledBy;
    this.location = location;
  }
}
