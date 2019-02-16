import { Component, OnInit, Input } from '@angular/core';
import { Talk } from '../common/talk.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.css']
})
export class TalksComponent implements OnInit {
  @Input() talks: Talk[];
  @Input() isUserInfo: boolean;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() { }

}
