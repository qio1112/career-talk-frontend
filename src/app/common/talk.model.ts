/**
 * model of talks
 */
export class Talk {
  _id: string;
  careerfair: { _id: string, name: string };
  company: { _id: string, name: string };
  startTime: string;
  endTime: string;
  scheduled: boolean;
  scheduledBy: string;
  location: string;
}
