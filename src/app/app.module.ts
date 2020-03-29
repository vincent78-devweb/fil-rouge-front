import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from './interceptors/error.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TopBarComponent } from './components/commons/top-bar/top-bar.component';
import { LeftBarComponent } from './components/commons/left-bar/left-bar.component';
import { LastSubscribesComponent } from './components/community/last-subscribes/last-subscribes.component';
import { BirthdaysComponent } from './components/community/birthdays/birthdays.component';
import { UsersManagerComponent } from './components/community/users-manager/users-manager.component';
import { TripsManagerComponent } from './components/trips/trips-manager/trips-manager.component';
import { TripCreateComponent } from './components/trip/trip-create/trip-create.component';
import { TripUpdateComponent } from './components/trip/trip-update/trip-update.component';
import { MyTripsManagerComponent } from './components/trips/my-trips-manager/my-trips-manager.component';
import { TripsManagerFilterFormComponent } from './components/trips/trips-manager-filter-form/trips-manager-filter-form.component';
import { TripDetailsComponent } from './components/trip/trip-details/trip-details.component';
import { UsersFilterFormComponent } from './components/community/users-filter-form/users-filter-form.component';
import { UsersListComponent } from './components/community/users-list/users-list.component';
import { UserDetailsComponent } from './components/community/user-details/user-details.component';
import { BreadcrumbComponent } from './components/commons/breadcrumb/breadcrumb.component';
import { MyPaginatorComponent } from './components/commons/my-paginator/my-paginator.component';
import { UserManagerComponent } from './components/community/user-manager/user-manager.component';
import { TripsListComponent } from './components/trips/trips-list/trips-list.component';
import { LeftBarCollapsideComponent } from './components/commons/left-bar-collapside/left-bar-collapside.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LeftBarComponent,
    LastSubscribesComponent,
    BirthdaysComponent,
    UsersManagerComponent,
    TripsManagerComponent,
    TripCreateComponent,
    TripUpdateComponent,
    MyTripsManagerComponent,
    TripsManagerFilterFormComponent,
    TripDetailsComponent,
    UsersFilterFormComponent,
    UsersListComponent,
    UserDetailsComponent,
    BreadcrumbComponent,
    MyPaginatorComponent,
    UserManagerComponent,
    TripsListComponent,
    LeftBarCollapsideComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
