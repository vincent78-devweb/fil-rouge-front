import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../models/community/user';
import { UserFilters } from '../../../models/community/user-filters';

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

  constructor( private usersService: UsersService ) { }

  ngOnInit() {
    this.usersService.filterSubject.subscribe((filters: UserFilters) => {

      this.userFilters = filters;

      this.paginate(filters, 1);
    });

    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

    /**
   * Paginate to the sent page
   * 
   * @param filters 
   * @param pageNumber
   * @see https://jasonwatmore.com/post/2019/06/18/angular-8-simple-pagination-example 
   */
  paginate(filters: UserFilters, pageNumber: number) {
    pageNumber--;

    this.usersService.filterUsers(filters.gender, filters.ageCategory, filters.pseudo, filters.regionId, filters.departmentId, pageNumber, 20, "login,asc").subscribe(data => {
      this.users = data;
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
