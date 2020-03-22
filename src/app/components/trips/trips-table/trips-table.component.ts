import { Component, OnInit } from '@angular/core';

import { Trip } from '../../../models/trips/trip';

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.css']
})
export class TripsTableComponent implements OnInit {

  isTripsListVisible = true;
  
  trips: Trip[] = [];

  constructor() { }

  ngOnInit() {
  }

  displayTrip(trip) {

  }

}
