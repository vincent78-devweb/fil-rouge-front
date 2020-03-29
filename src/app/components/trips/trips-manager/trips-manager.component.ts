import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/community/user';
import {Trip} from '../../../models/trips/trip';

@Component({
  selector: 'app-trips-manager',
  templateUrl: './trips-manager.component.html',
  styleUrls: ['./trips-manager.component.css']
})
export class TripsManagerComponent implements OnInit {

  title: string = "Sortir";
  level1: string = "Les sorties";
  level2: string = "";

  isFormListVisible = true;
  isTripVisible = false;
  trip: Trip;

  constructor() { }

  ngOnInit() {
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
    this.isFormListVisible = false;
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
    this.isFormListVisible = true;
    // Toggle : hide user details
    this.isTripVisible = false;
  }


}
