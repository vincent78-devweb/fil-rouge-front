import { Component, OnInit } from '@angular/core';

import { User } from '../../../models/community/user';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.css']
})
export class UsersManagerComponent implements OnInit {

  // Breadcrumb parameters
  title: string = "La communauté";
  level1: string = "Les utilisateurs";
  level2: string = "";

  isFormListVisible = true;
  isUserVisible = false;
  user: User;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Toggle display from [form filters, user list] to user details
   *
   * @param user the user to display
   */
  notifyShowUser(user: User) {
  //  console.log(user);
    // Update the breadcrumb : show user name
    this.user = user;
    this.level2 = user.firstname + " " + user.lastname;
    // Toggle : hide form filters and user list
    this.isFormListVisible = false;
    // Toggle : show user details
    this.isUserVisible = true;
  }

  /**
   * Toggle display from user details to [form filters, user list]
   *
   * @param user the user to hide
   */
  notifyHideUSer(user: User) {
    // Update the breadcrumb : hide user name
    this.user = undefined;
    this.level2 = '';
    // Toggle : show form filters and user list
    this.isFormListVisible = true;
    // Toggle : hide user details
    this.isUserVisible = false;
  }
}
