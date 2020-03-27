import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Poi } from '../../models/community/poi';

@Injectable({
  providedIn: 'root'
})
export class PoisService {

  constructor(private http: HttpClient) { }

  public getPois(): Observable<Poi[]> {
    return this.http.get<Poi[]>("http://localhost:8080/api/pois");
  }
}
