import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Talk } from 'src/app/common/talk.model';
import { Company } from 'src/app/common/company.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-talk-item',
  templateUrl: './talk-item.component.html',
  styleUrls: ['./talk-item.component.css']
})
export class TalkItemComponent implements OnInit, OnDestroy {
  @Input() talk: Talk;
  private userId: string;
  isScheduledByMe = false;
  isScheduled = true;
  private talkStatusListenerSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.isScheduled = this.talk.scheduled;
    // console.log(this.talk.scheduledBy);
    if (this.isScheduled) {
      this.isScheduledByMe = this.userId === this.talk.scheduledBy;
    }
    this.talkStatusListenerSubscription = this.userService.getTalkStatusListener()
      .subscribe(result => {
        if (result.talkId === this.talk._id) {
          this.isScheduledByMe = !this.isScheduledByMe;
          this.isScheduled = result.status;
        }
      });
  }

  ngOnDestroy() {
    this.talkStatusListenerSubscription.unsubscribe();
  }

  onUnscheduleTalk() {
    this.userService.unscheduleTalk(this.talk)
      .subscribe(result => {
        console.log(result);
      });
  }

  onScheduleTalk() {
    this.userService.scheduleTalk(this.talk)
      .subscribe(result => {
        console.log(result);
      });
  }
}
