import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError } from 'rxjs';

import { City } from '../../models/zone/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  /**
   * Get all cities from a department
   * 
   * @param departmentId the department to get 
   * @returns the cities
   */
  public getCitiesByDepartment(departmentId: number): Observable<City[]> {
    return this.http.get<City[]>("http://localhost:8080/api/cities/departments/" + departmentId);
  }
}
