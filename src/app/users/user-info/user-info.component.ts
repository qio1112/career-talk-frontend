import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/common/user.model';
import { Talk } from 'src/app/common/talk.model';
import { Subscription } from 'rxjs';
import { Urls } from 'src/app/common/urls';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  private serverUrl = Urls.serverUrl;
  user = <User>{};
  scheduledTalks = <Talk[]>[];
  avatarPath = '';
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
        this.avatarPath = this.serverUrl + '/' + this.user.avatarPath;
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

  onChangePhoto(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    this.userService.uploadAvatar(file)
      .subscribe(result => {
        console.log(result);
      });
  }
}
