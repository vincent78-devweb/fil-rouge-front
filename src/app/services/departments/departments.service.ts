import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../../models/zone/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }


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
