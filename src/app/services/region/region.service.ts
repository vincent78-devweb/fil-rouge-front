import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Region } from '../../models/zone/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) { }

  public getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>("http://localhost:8080/api/regions");
  }
}
