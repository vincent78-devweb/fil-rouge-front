import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { User } from '../../../models/community/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  // The user to display
  @Input() user: User;
  // The component close event to emit
  @Output() onNotifyHideUser = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChange) {
    //if(change['user'] !== undefined)
    //  console.log(change['user'].currentValue);
    //(change.serie.firstChange === true) ? this.isVisible = false : this.isVisible = true;
  }


  /**
   * Emit event : Close component 
   * 
   * @event: onNotifyHideUser<User>
   */
  hide() {
    this.onNotifyHideUser.emit(this.user);
  }

}
