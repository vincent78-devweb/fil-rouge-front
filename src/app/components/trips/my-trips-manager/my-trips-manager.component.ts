import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Trip} from '../../../models/trips/trip';
import {TripsService} from '../../../services/trips/trips.service';
import {TripFilters} from '../../../models/trips/trip-filters';

@Component({
  selector: 'app-my-trips-manager',
  templateUrl: './my-trips-manager.component.html',
  styleUrls: ['./my-trips-manager.component.css']
})
export class MyTripsManagerComponent implements OnInit,  AfterViewInit {

  title: string = "Les sorties";
  level1: string = "";
  level2: string = "";

  isListTripVisible = true;
  isTripVisible = false;
  trip: Trip;
  currentUser: number;

  constructor(
    private tripsService: TripsService,

  ) { }

  ngOnInit() {
    this.currentUser = 1 ;
  }



  ngAfterViewInit(): void {
    this.currentUser = 2;
    let filter: TripFilters = {
      poiId: 0,
      regionId: 0,
      departmentId: 0,
      keywords: '',
      userId: 2,
      startDate: ''
    } ;
    this.tripsService.filterSubject.next(filter);

  }



  /**
   * Toggle display from [form filters, user list] to user details
   *
   * @param user the user to display
   */
  notifyShowTrip(trip: Trip) {
    // Update the breadcrumb : show user name
    this.trip = trip;
    //  this.level2 = user.firstname + " " + user.lastname;
    // Toggle : hide form filters and user list
    this.isListTripVisible = false;
    // Toggle : show user details
    this.isTripVisible = true;
  }

  /**
   * Toggle display from user details to [form filters, user list]
   *
   * @param user the user to hide
   */
  notifyHideTrip(trip: Trip) {
    // Update the breadcrumb : hide user name
    this.trip = trip;
    this.level2 = '';
    // Toggle : show form filters and user list
    this.isListTripVisible = true;
    // Toggle : hide user details
    this.isTripVisible = false;
  }



}
