import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../../models/zone/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }


  /**
   * Get all departments
   * @returns the departments
   */
  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>("http://localhost:8080/api/departments");
  }

  /**
   * Get all departments from a region
   * @param regionId the region to get
   * @returns the departments
   */
  public getDepartmentsByRegion(regionId: number): Observable<Department[]> {
    return this.http.get<Department[]>("http://localhost:8080/api/departments/regions/" + regionId);
  }

  /**
   * Get a department
   * @param departmentId the department to get
   * @returns the department
   */
  public getDepartment(departmentId: number): Observable<Department> {
    return this.http.get<Department>("http://localhost:8080/api/departments/" + departmentId);
  }

}
