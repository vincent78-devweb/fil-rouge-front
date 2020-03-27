import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, Subject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Poi } from '../../models/commons/poi';

import {Region} from '../../models/zone/region';

@Injectable({
  providedIn: 'root'
})
export class PoisService {

  constructor(private http: HttpClient) { }

  public getPois(): Observable<Poi[]> {
    return this.http.get<Poi[]>("http://localhost:8080/api/pois");
  }
}
