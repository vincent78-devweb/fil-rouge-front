import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError, } from 'rxjs';
import { tap, map, finalize } from 'rxjs/operators';

import { catchError, retry } from 'rxjs/operators';

import { User } from '../../models/community/user';
import { UserFilters } from '../../models/community/user-filters';
import { UsersListPager } from '../../models/community/users-list-pager';
import { UserPut } from '../../models/community/user-put';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BIRTHDAYS_OF_THE_DAY_URL: string = "http://localhost:4200/api/users/birthdays";
  private LAST_SUBSCRIBES_URL: string = "http://localhost:4200/api/users/lastsubscribes";
  isLocal: boolean = false;

  // Observable object to transfer user filters to the user list component
  filterSubject: Subject<Object> = new Subject();

  // Authentified user (fake)
  currentUser: User;

  constructor(
    private http: HttpClient
  ) {
    // Load a fake current user
    this.setCurrentUser();
  }

  /**
   * Filter users on multi criterias
   * 
   * @param gender 
   * @param ageCategory 
   * @param pseudo 
   * @param region 
   * @param department 
   * @param page the page to get
   * @param size the number of elements in the page
   * @param sort the sort criteria
   * @returns the page user
   */
  public filterUsers(gender: string, ageCategory: string, pseudo: string, region: number, department: number, page: number, size: number, sort: string): Observable<UsersListPager> {
    // Set parameters
    const params = new HttpParams()
      .set('gender', gender)
      .set('category', ageCategory)
      .set('login', pseudo)
      .set('region', region.toString())
      .set('department', department.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<UsersListPager>('http://localhost:8080/api/users/filter', { params });
  }

  /**
   * Get birthdays of the day
   * 
   * @param page the page to get
   * @param size the number of elements in the page
   * @param sort the sort criteria
   * @returns the page user
   */
  public getBirthdays(page: number, size: number, sort: string): Observable<UsersListPager> {
    // Set parameters
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<UsersListPager>('http://localhost:8080/api/users/birthdays', { params });
  }

  /**
   * Save the user on the server
   * @param user the user to save
   * @param id the id of the user to save
   * @returns the response
   */
  public updateUser(user: UserPut, id: number): Observable<any> {
    return this.http.put<User>('http://localhost:8080/api/users/' + id, user);
  }


  /**
   * Find a user by id
   * @param id
   */
  public getUser(id: number): Observable<User> {
    return this.http.get<User>("http://localhost:8080/api/users/" + id);
  }

  /**
   * Fake authentification : initial current user
   */
  setCurrentUser() {
    this.currentUser =
    {
      id: 1,
      firstname: "Georas",
      lastname: "Perazzo",
      login: "gperazzo0",
      email: "gperazzo0@technorati.com",
      avatar: "http://icons.iconarchive.com/icons/google/noto-emoji-people-face/128/10147-adult-light-skin-tone-icon.png",
      description: "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
      birthday: "1985-04-23",
      dateCreation: "23/06/2019 00:00",
      age: 34,
      city: {
        id: 1589,
        name: "LE CASTELLET",
        postalCode: "4700",
        latitude: 48821.0,
        longitude: 55848.0,
        department:
        {
          id: 4,
          name: "Alpes-de-Haute-Provence",
          region:
          {
            id: 13,
            name: "Provence-Alpes-Côte d Azur"
          }
        }
      },
      pois: [
        {
          id: 1,
          name: "Cinéma"
        }, {
          id: 2,
          name: "Théatre"
        }
      ],
      gender: "M"
    };

  }

}
