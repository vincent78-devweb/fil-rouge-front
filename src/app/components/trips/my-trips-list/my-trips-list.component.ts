import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Trip} from '../../../models/trips/trip';
import {TripFilters} from '../../../models/trips/trip-filters';
import {PagerParams} from '../../../models/commons/pager-params';
import {TripsService} from '../../../services/trips/trips.service';
import {TripsListPager} from '../../../models/trips/trips-list-pager';
import {Router} from '@angular/router';
import {TripManagerService} from '../../../services/TripManager/trip-manager.service';

@Component({
  selector: 'app-my-trips-list',
  templateUrl: './my-trips-list.component.html',
  styleUrls: ['./my-trips-list.component.css']
})
export class MyTripsListComponent  implements OnInit, OnChanges {

  // Notifications vers le manager pour gérer l’affichage:
  // - Du bandeau de titre
  // - Du formulaire de filtre users
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNotifyShowTrip = new EventEmitter<Trip>();
  @Input() trip: Trip;

  tripFilters: TripFilters;
  trips: Trip[] = [];
  pager: PagerParams;
  pageNumber: number;

  constructor(
              private tripManagerService: TripManagerService,
              private tripsService: TripsService) {
    this.pager = {
      currentPage: 0,
      totalPages: 0,
      pageTotalElements: 0,
      totalElements: 0,
      size: 0
    };

  }

  ngOnInit() {
    this.tripsService.filterSubject.subscribe((filters: TripFilters) => {

      this.tripFilters = filters;

      // TODO : Workaround cause poId can be undefined
      if (this.tripFilters !== undefined)
        this.paginate(0);
    });
  }

  onPaginate(pageNumber) {
    this.paginate(pageNumber);
  }

  ngOnChanges(changes: SimpleChanges) {
    // TODO : Workaround cause poId can be undefined
    if (this.tripFilters !== undefined)
      this.paginate(this.pageNumber);
  }



  /**
   * Paginate to the sent page
   *
   * param filters
   * param pageNumber
   * see https://jasonwatmore.com/post/2019/06/18/angular-8-simple-pagination-example
   */
  paginate(pageNumber: number) {

    this.pageNumber = pageNumber;
    this.tripsService.filterTrips(this.tripFilters.poiId, this.tripFilters.regionId, this.tripFilters.departmentId, this.tripFilters.keywords, this.tripFilters.userId, this.tripFilters.startDate, pageNumber, 20, "name,asc").subscribe(data => {
      const tripsListPager: TripsListPager = data;
      this.trips = data.content;

      let currentPager: PagerParams;
      currentPager = {
        currentPage: tripsListPager.number,
        totalPages: tripsListPager.totalPages,
        pageTotalElements: this.trips.length,
        totalElements: tripsListPager.totalElements,
        size: tripsListPager.size
      };

      this.pager = currentPager;

    });
  }

  /**
   * Afficher les informations détaillées d'un utilisateur
   *
   * @param user
   */
  updateTrip(trip: Trip) {
    // Notification Affichage demandé des informations détaillées d'un utilisateur
    this.onNotifyShowTrip.emit(trip);
  }

  deleteTrip(trip: Trip) {
    this.tripManagerService.deleteTrip(trip.id).subscribe(() => {
      this.paginate(0);
    });
  }

}
