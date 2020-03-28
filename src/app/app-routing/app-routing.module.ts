import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TripsManagerComponent } from '../components/trips/trips-manager/trips-manager.component';
import { MyTripsManagerComponent } from '../components/trips/my-trips-manager/my-trips-manager.component';
import { TripCreateComponent } from '../components/trip/trip-create/trip-create.component';
import { TripUpdateComponent } from '../components/trip/trip-update/trip-update.component';

import { UsersManagerComponent } from '../components/community/users-manager/users-manager.component';
import { LastSubscribesComponent } from '../components/community/last-subscribes/last-subscribes.component';
import { BirthdaysComponent } from '../components/community/birthdays/birthdays.component';
import { UserManagerComponent } from '../components/community/user-manager/user-manager.component';

const appRouteList: Routes = [
  {
      path: 'users',
      component: UsersManagerComponent
  }, {
      path: 'last-subscribes',
      component: LastSubscribesComponent
  }, {
      path: 'birthdays',
      component: BirthdaysComponent
  }, {
      path: 'admin',
      component: UserManagerComponent
  }, {
      path: 'trips',
      component: TripsManagerComponent
  }, {
      path: 'new-trip',
      component: TripCreateComponent
  }, {
      path: 'my-trips',
      component: MyTripsManagerComponent
  }, {
      path: '**',
      redirectTo: 'trips'
  }
];

@NgModule({
  declarations: [],
  exports: [
    RouterModule
],
  imports: [
    RouterModule.forRoot(appRouteList),
    CommonModule
  ]
})
export class AppRoutingModule { }
