import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/common/user.model';
import { Talk } from 'src/app/common/talk.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  user = <User>{};
  scheduledTalks = <Talk[]>[];
  // count the number of scheduled talks
  numberOfScheduledTalks = 0;
  private talkStatusListenerSubscription: Subscription;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    // get user information
    this.userService.fetchUserInfo()
      .subscribe(userInfo => {
        this.user = userInfo.user;
      });
    // get scheduled talks
    this.userService.findScheduledTalks()
      .subscribe(talksInfo => {
        this.scheduledTalks = talksInfo.talks;
        console.log(talksInfo);
        this.numberOfScheduledTalks = this.scheduledTalks ? this.scheduledTalks.length : 0;
      });
    this.talkStatusListenerSubscription = this.userService.getTalkStatusListener()
      .subscribe(result => {
        // if unscheduled a talk, number minus 1
        if (!result.status) {
          this.numberOfScheduledTalks -= 1;
        }
      });
  }

  ngOnDestroy() {
    this.talkStatusListenerSubscription.unsubscribe();
  }
}
