import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../models/community/user';

@Component({
  selector: 'app-last-subscribes',
  templateUrl: './last-subscribes.component.html',
  styleUrls: ['./last-subscribes.component.css']
})
export class LastSubscribesComponent implements OnInit {

  lastSubscribes: User[] = [];

  constructor( private usersService: UsersService ) { }

  ngOnInit() {
    this.usersService.getLastSubscribes().subscribe(data => {
      this.lastSubscribes = data;
    })
  }

}
