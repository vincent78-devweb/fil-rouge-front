import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError } from 'rxjs';

import { User } from '../../models/community/user';
import { UserFilters } from '../../models/community/user-filters';
import { UsersListPager } from '../../models/community/users-list-pager';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BIRTHDAYS_OF_THE_DAY_URL: string = "http://localhost:4200/api/users/birthdays";
  private LAST_SUBSCRIBES_URL: string = "http://localhost:4200/api/users/lastsubscribes";
  isLocal: boolean = false;

  // Observable object to transfer user filters to the user list component
  filterSubject: Subject<Object> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Filter users
   * 
   * @param gender 
   * @param ageCategory 
   * @param pseudo 
   * @param region 
   * @param department 
   * @param page 
   * @param size 
   * @param sort 
   */
  public filterUsers(gender: string, ageCategory :string, pseudo: string, region: number, department: number, page: number, size: number, sort: string) :Observable<UsersListPager> {
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

    return this.http.get<UsersListPager>('http://localhost:8080/api/users/filter', {params});
  }

  /**
   * Get last subscribes users
   */
  public getLastSubscribes(): Observable<User[]> {
    if(this.isLocal) {
        return of(this.users.slice());
    } else {
      return of(this.users.slice());
      //return this.http.get<User>(this.LAST_SUBSCRIBES_URL);
    }
  }

  /**
   * Get birthdays of the day
   */
  public getBirthdays(): Observable<User[]> {
    if(this.isLocal) {
        return of(this.users.slice());
    } else {
      return of(this.users.slice());
      //return this.http.get<User>(this.BIRTHDAYS_OF_THE_DAY_URL);
    }
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8080/api/users");
  }

  users :User[];
}
