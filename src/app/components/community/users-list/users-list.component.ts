import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../models/community/user';
import { UserFilters } from '../../../models/community/user-filters';
import { UsersListPager } from '../../../models/community/users-list-pager';
import { PagerParams } from '../../../models/commons/pager-params';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  // Notifications vers le manager pour gérer l'affichage :
  // - Du bandeau de titre
  // - Du formulaire de filtre users
  @Output() onNotifyShowUser = new EventEmitter<User>();

  userFilters: UserFilters;
  users: User[] = [];

  pager: PagerParams;

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
    this.usersService.filterSubject.subscribe((filters: UserFilters) => {

      this.userFilters = filters;

      this.paginate(0);
    });
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
    this.usersService.filterUsers(this.userFilters.gender, this.userFilters.ageCategory, this.userFilters.pseudo, this.userFilters.regionId, this.userFilters.departmentId, pageNumber, 20, "login,asc").subscribe(data => {
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
   * Afficher les informations détaillées d'un utilisateur
   * 
   * @param user 
   */
  showUser(user: User) {
    // Notification Affichage demandé des informations détaillées d'un utilisateur
    this.onNotifyShowUser.emit(user);
  }


}
