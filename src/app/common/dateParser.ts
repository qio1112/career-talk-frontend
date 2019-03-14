export class DateParser {
  months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

  static parseDate(d: Date): {date: string, time: string, timeString: string} {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[d.getDay()];
    const date = d.getDate().toString();
    const month = (d.getMonth() + 1).toString();
    const year = d.getFullYear().toString();
    const minute = d.getMinutes() >= 10 ? d.getMinutes().toString() : ('0' + d.getMinutes().toString());
    let hourNumber = d.getHours();
    let amOrPm = 'am';
    if (hourNumber === 0) {
      hourNumber = 12;
    } else if (hourNumber > 12) {
      amOrPm = 'pm';
      hourNumber -= 12;
    }
    const hour = hourNumber.toString();
    return {
      date: month + '/' + date + '/' + year + ', ' + day,
      time: hour + ': ' + minute + ' ' + amOrPm,
      timeString: month + '/' + date + '/' + year + ', ' + day + ' ' + hour + ': ' + minute + ' ' + amOrPm
    };
  }
}
