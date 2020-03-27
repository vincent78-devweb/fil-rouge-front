import { Component, OnInit } from '@angular/core';

import { UsersListPager } from '../../../models/community/users-list-pager';
import { PagerParams } from '../../../models/commons/pager-params';
import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../models/community/user';
@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  // Breadcrumb parameters
  title: string = "La communauté";
  level1: string = "Les anniversaires du jour!";
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
    this.paginate(0);
  }

  onPaginate(pageNumber){
    this.paginate(pageNumber);
  }

  /**
   * Paginate to the sent page
   * 
   * @param filters 
   * @param pageNumber
   * @see https://jasonwatmore.com/post/2019/06/18/angular-8-simple-pagination-example 
   */
  paginate(pageNumber: number) {
    this.usersService.getBirthdays(pageNumber, 20, "dateCreation,desc").subscribe(data => {
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

  showUser(user: User) {
    this.user = user;
    this.level2 = user.firstname + " " + user.lastname;
    this.isListVisible = false;
    this.isUserVisible = true;
  }

  notifyHideUSer($event) {
    this.user = undefined;
    this.level2 = '';
    this.isListVisible = true;
    this.isUserVisible = false;
  }

}
