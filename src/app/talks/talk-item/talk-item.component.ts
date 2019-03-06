import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Talk } from 'src/app/common/talk.model';
import { Company } from 'src/app/common/company.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { DateParser } from 'src/app/common/dateParser';

@Component({
  selector: 'app-talk-item',
  templateUrl: './talk-item.component.html',
  styleUrls: ['./talk-item.component.css']
})
export class TalkItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() talk: Talk;
  @Input() isUserInfo: boolean;
  private userId: string;
  isScheduledByMe = false; // if the talk is scheduled by the current user
  isScheduled = true;
  private talkStatusListenerSubscription: Subscription;
  date = <string>'';
  startTime = <string>'';
  endTime = <string>'';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.isScheduled = this.talk.scheduled;
    // if is scheduled, check if talk is scheduled by the user
    if (this.isScheduled) {
      this.isScheduledByMe = this.userId === this.talk.scheduledBy;
    }
    // listen to the subscription of talk status
    this.talkStatusListenerSubscription = this.userService.getTalkStatusListener()
      .subscribe(result => {
        if (result.talkId === this.talk._id) {
          this.isScheduledByMe = !this.isScheduledByMe;
          this.isScheduled = result.status;
          this.talk.scheduled = result.status;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.talk) {
      const startTime = new Date(this.talk.startTime);
      const endTime = new Date(this.talk.endTime);
      this.date = DateParser.parseDate(startTime).date;
      this.startTime = DateParser.parseDate(startTime).time;
      this.endTime = DateParser.parseDate(endTime).time;
    }
  }

  ngOnDestroy() {
    this.talkStatusListenerSubscription.unsubscribe();
  }

  // click the unschedule button, unschedule a talk
  onUnscheduleTalk() {
    this.userService.unscheduleTalk(this.talk)
      .subscribe(result => {
        console.log(result);
      });
  }

  // click schedule button, schedule a talk
  onScheduleTalk() {
    this.userService.scheduleTalk(this.talk)
      .subscribe(result => {
        console.log(result);
      });
  }
}
