import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {User} from '../../../models/community/user';
import {Trip} from '../../../models/trips/trip';
import {TripsService} from '../../../services/trips/trips.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit, OnChanges {

  constructor(
    private tripsService: TripsService,
  ) {
  }


  // The user to display
  @Input() trip: Trip;
  // The component close event to emit
  @Output() onNotifyHideTrip = new EventEmitter<Trip>();

  isTripVisible = true;
  isUserVisible = false;
  user: User;
  action: string;
  isRegister: boolean;
  currentUserId: number;


  ngOnInit() {
    // user = new User();
    this.currentUserId = 1;

  }

  ngOnChanges(changes: SimpleChanges) {
    this.check();
  }


  /**
   * Emit event : Close component
   *
   * @event: onNotifyHideUser<User>
   */
  hide() {
    this.onNotifyHideTrip.emit(this.trip);
  }


  notifyHideUSer() {
    this.isUserVisible = false;
    this.isTripVisible = true;
  }

  showUser() {
    this.isUserVisible = true;
    this.isTripVisible = false;
    this.user = this.trip.promoteur;
  }

  register() {
    this.tripsService.register(this.currentUserId, this.trip.id, this.isRegister).subscribe(data => {
      this.trip = data;
      this.check();
    });
  }

  check() {
     this.action = 'Inscrivez-vous';
    this.isRegister = false;
    if (this.trip != undefined) {
      if (this.trip !== null) {
        if (this.trip.users.length > 0) {
          for (const currentUser of this.trip.users) {
            if (currentUser.id === this.currentUserId) {
              this.action = 'Se désinscrire';
              this.isRegister = true;
              break;
            }
          }
        }
      }
    }
  }

}
