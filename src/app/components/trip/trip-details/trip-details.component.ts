import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {User} from '../../../models/community/user';
import {Trip} from '../../../models/trips/trip';
import {TripsService} from '../../../services/trips/trips.service';
import {UsersService} from '../../../services/users/users.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit, OnChanges {

  constructor(
    private tripsService: TripsService,
    private usersService: UsersService,
  ) {
  }


  // The user to display
  @Input() trip: Trip;
  // The component close event to emit
  @Output() onNotifyHideTrip = new EventEmitter<Trip>();

  isTripVisible = true;
  isUserVisible = false;
  user: User;
  isRegister: boolean;
  currentUserId: number;
  registerTrip = 'Inscrivez-vous';
  unregisterTrip = 'Se déinscrire';
  max: boolean;

  ngOnInit() {
    this.currentUserId = this.usersService.currentUser.id;

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
    this.isRegister = false;
    if (this.trip != undefined) {
      if (this.trip !== null) {
        if (this.trip.users.length == this.trip.nbPerson) {
          this.max = true;
        } else {
          this.max = false;
        }
      }
      if (this.trip.users.length > 0) {
        for (const currentUser of this.trip.users) {
          if (currentUser.id === this.currentUserId) {
            this.isRegister = true;
            break;
          }
        }
      }
    }
  }
}

