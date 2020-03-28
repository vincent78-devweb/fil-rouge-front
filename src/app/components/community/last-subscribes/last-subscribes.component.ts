import { Component, OnInit } from '@angular/core';

import { UsersListPager } from '../../../models/community/users-list-pager';
import { PagerParams } from '../../../models/commons/pager-params';
import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../models/community/user';

@Component({
  selector: 'app-last-subscribes',
  templateUrl: './last-subscribes.component.html',
  styleUrls: ['./last-subscribes.component.css']
})
export class LastSubscribesComponent implements OnInit {

  // Breadcrumb parameters
  title: string = "La communauté";
  level1: string = "Derniers inscrits";
  level2: string = "";

  isListVisible = true;
  isUserVisible = false;

  pager: PagerParams;

  users: User[] = [];
  user: User;

  constructor( private usersService: UsersService ) { 
    this.pager = {
      currentPage: 0,
      totalPages: 0,
      pageTotalElements: 0,
      totalElements: 0,
      size: 0
    };
  }

  ngOnInit() {
    // At start, show the first page of user's biryhdays by default
    this.paginate(0);
  }

  /**
   * Paginate action event
   * 
   * @param pageNumber the page to show 
   */
  onPaginate(pageNumber){
    this.paginate(pageNumber);
  }

  /**
   * Paginate to the sent page
   * TODO : refactor this function in onPaginate()
   * 
   * @param pageNumber the page to show
   */
  paginate(pageNumber: number) {
    this.usersService.filterUsers('', '', '', 0, 0, pageNumber, 20, "dateCreation,desc").subscribe(data => {
      const userListpager: UsersListPager = data;
      this.users = data.content;

      let currentPager: PagerParams;
      currentPager = {
        currentPage : userListpager.number,
        totalPages : userListpager.totalPages,
        pageTotalElements : this.users.length,
        totalElements : userListpager.totalElements,
        size : userListpager.size
      }

      this.pager = currentPager;

    });
  }

  /**
   * Show the user details
   * 
   * @param user the user to show
   */
  showUser(user: User) {
    this.user = user;
    this.level2 = user.firstname + " " + user.lastname;
    this.isListVisible = false;
    this.isUserVisible = true;
  }

  /**
   * Hide the user details
   * 
   * @param $event The user to hide
   */
  notifyHideUSer($event) {
    this.user = undefined;
    this.level2 = '';
    this.isListVisible = true;
    this.isUserVisible = false;
  }
}
