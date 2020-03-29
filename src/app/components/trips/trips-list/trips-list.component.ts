import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { PagerParams } from '../../../models/commons/pager-params';
import { Trip } from '../../../models/trips/trip';
import { TripsService } from '../../../services/trips/trips.service';
import { TripFilters } from '../../../models/trips/trip-filters';
import { TripsListPager } from '../../../models/trips/trips-list-pager';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit, OnChanges {

  // Notifications vers le manager pour gérer l'affichage :
  // - Du bandeau de titre
  // - Du formulaire de filtre users
  @Output() onNotifyShowTrip = new EventEmitter<Trip>();
  @Input() trip: Trip;

  tripFilters: TripFilters;
  trips: Trip[] = [];
  isListTripVisible: true;
  pager: PagerParams;
  pageNumber: number;

  constructor(private tripsService: TripsService) {
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
    console.log("Test");
    if (this.tripFilters !== undefined)
      this.paginate(this.pageNumber);
  }



  /**
   * Paginate to the sent page
   *
   * @param filters
   * @param pageNumber
   * @see https://jasonwatmore.com/post/2019/06/18/angular-8-simple-pagination-example
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
      }

      this.pager = currentPager;

    });
  }

  /**
   * Afficher les informations détaillées d'un utilisateur
   *
   * @param user
   */
  showTrip(trip: Trip) {
    // Notification Affichage demandé des informations détaillées d'un utilisateur
    this.onNotifyShowTrip.emit(trip);
  }

}
