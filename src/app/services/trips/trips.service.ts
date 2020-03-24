import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Region } from '../../models/trips/region';
import { Department } from '../../models/trips/department';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

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
