import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../models/community/user';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  birthdaysOfTheDay: User[] = [];

  constructor( private usersService: UsersService ) { }

  ngOnInit() {
    this.usersService.getBirthdays().subscribe(data => {
      this.birthdaysOfTheDay = data;
    })
  }

}
