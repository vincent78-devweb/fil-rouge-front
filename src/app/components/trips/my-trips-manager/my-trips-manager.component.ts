import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Trip} from '../../../models/trips/trip';
import {TripsService} from '../../../services/trips/trips.service';
import {TripFilters} from '../../../models/trips/trip-filters';
import {UsersService} from '../../../services/users/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-trips-manager',
  templateUrl: './my-trips-manager.component.html',
  styleUrls: ['./my-trips-manager.component.css']
})
export class MyTripsManagerComponent implements OnInit,  AfterViewInit {

  title = 'Sortir';
  level1 = 'Mes sorties';
  level2 = '';

  isFormListVisible = true;
  isListTripVisible = true;
  isTripVisible = false;
  trip: Trip;
  currentUser: number;

  constructor(private router: Router,
    private tripsService: TripsService,
    private usersService: UsersService,

  ) { }

  ngOnInit() {
  }



  ngAfterViewInit(): void {
    this.currentUser = this.usersService.currentUser.id ;
    const filter: TripFilters = {
      poiId: 0,
      regionId: 0,
      departmentId: 0,
      keywords: '',
      userId: this.currentUser,
      startDate: ''
    } ;
    this.tripsService.filterSubject.next(filter);

  }



  /**
   * Toggle display from [form filters, user list] to user details
   *
   * param user the user to display
   */
  notifyShowTrip(trip: Trip) {
    // Update the breadcrumb : show user given name
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
   * param user the user to hide
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
