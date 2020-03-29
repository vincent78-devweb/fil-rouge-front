import { Injectable } from '@angular/core';
import {Trip} from '../../models/trips/trip';
import {Observable} from 'rxjs';
import {TripManager} from '../../models/trips/trip-manager';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripManagerService {

  constructor(private http: HttpClient) { }


  /**
   * Create a trip on the server
   * param trip
   */
  public createTrip(trip: TripManager): Observable<Trip> {

    return this.http.post<Trip>('http://localhost:8080/api/tripmanager/', trip);
  }

  /**
   * Update a trip on the server
   * param trip
   * param id
   */
  public updateTrip(trip: TripManager, id: number): Observable<Trip> {
    return this.http.put<Trip>('http://localhost:8080/api/tripmanager/' + id, trip);
  }

  public deleteTrip( id: number): Observable<Trip> {
    return this.http.delete<any>('http://localhost:8080/api/tripmanager/' + id);
  }
}
