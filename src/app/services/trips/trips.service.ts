import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Region } from '../../models/zone/region';
import { Department } from '../../models/zone/department';
import {TripsListPager} from '../../models/trips/trips-list-pager';
import {Trip} from '../../models/trips/trip';
import {UserPut} from '../../models/community/user-put';
import {TripManager} from '../../models/trips/trip-manager';


@Injectable({
  providedIn: 'root'
})
export class TripsService {

  // Observable object to transfer user filters to the user list component
  filterSubject: Subject<Object> = new Subject();

  constructor(private http: HttpClient) { }

  /**
   * Filter Trips
   *
   * @param poi
   * @param region
   * @param department
   * @param page
   * @param size
   * @param sort
   */
  public filterTrips( poi: number, region: number, department: number, keywords: string , user: number, startDate: string , page: number, size: number, sort: string): Observable<TripsListPager> {
    // Set parameters
    const params = new HttpParams()
      .set('poi', poi.toString())
      .set('region', region.toString())
      .set('department', department.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('words', keywords)
      .set('user', user.toString())
      .set('startDate', startDate)
      .set('sort', sort);

    return this.http.get<TripsListPager>('http://localhost:8080/api/trips/filter', {params});
  }

  public register( user: number, trip: number, register: boolean): Observable<Trip>  {
    const params = new HttpParams()
      .set('user', user.toString())
      .set('trip', trip.toString())
      .set('register', register.toString());

    return this.http.get<Trip>('http://localhost:8080/api/trips/register', {params});

  }




  public getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>("http://localhost:8080/api/regions");
  }

  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>("http://localhost:8080/api/departments");
  }

  public getDepartmentsByRegion(regionId: number): Observable<Department[]> {
    return this.http.get<Department[]>("http://localhost:8080/api/departments/regions/" + regionId);
  }

  public getDepartment(departmentId: number): Observable<Department> {
    return this.http.get<Department>("http://localhost:8080/api/departments/" + departmentId);
  }
}
