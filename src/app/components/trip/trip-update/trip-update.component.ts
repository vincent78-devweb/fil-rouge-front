import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UsersService} from '../../../services/users/users.service';
import {CitiesService} from '../../../services/cities/cities.service';
import {User} from '../../../models/community/user';
import {Department} from '../../../models/zone/department';
import {PoisService} from '../../../services/pois/pois.service';
import {City} from '../../../models/zone/city';
import {Trip} from '../../../models/trips/trip';
import {DepartmentsService} from '../../../services/departments/departments.service';
import {Poi} from '../../../models/commons/poi';
import {TripManager} from '../../../models/trips/trip-manager';
import {TripManagerService} from '../../../services/TripManager/trip-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trip-update',
  templateUrl: './trip-update.component.html',
  styleUrls: ['./trip-update.component.css']
})
export class TripUpdateComponent implements OnInit, AfterViewInit, OnChanges  {
  // Breadcrumb parameters
  title = 'Sortir';
  level1 = 'Mes sorties';
  level2 = '';

  @Input() trip: Trip;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNotifyHideTrip = new EventEmitter<Trip>();


  departments: Department[];
  pois: Poi[];
  cities: City[];
  departmentId: number;
  tripForm: FormGroup;
  submitted = false;
  selectedCity = undefined;

  user: User;
  tripManager: TripManager = undefined;

  person: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  ages: number[] = [];

  constructor(private router: Router,
              private usersService: UsersService,
              private citiesService: CitiesService,
              private tripManagerService: TripManagerService,
              private poisService: PoisService,
              private departmentsService: DepartmentsService,
              private formBuilder: FormBuilder) {
    this.tripForm = this.formBuilder.group({
      name: new FormControl(),
      dateTrip: new FormControl(),
      timeStart: new FormControl(),
      timeEnd: new FormControl(),
      nbPerson: new FormControl(),
      description: new FormControl(),
      city: new FormControl(),
      poi: new FormControl(),
      ageMin: new FormControl(),
      ageMax: new FormControl(),
      departmentId: new FormControl()
    });
  }

  ngOnInit() {
    for (let i = 18; i < 101 ; i++) {
      this.ages[i] = i;
    }

    this.initDepartments();
    this.initPoIs();
  }

  ngAfterViewInit(): void {
    this.user = this.usersService.currentUser;

    // tslint:disable-next-line:new-parens
    this.tripManager = new class implements TripManager {
      id: 0;
      name: '';
      description: '';
      dateTrip: '';
      timeStart: '';
      timeEnd: '';
      nbPerson: 0;
      ageMin: 0;
      ageMax: 0;
      promoteurId: 0;
      poiId: 0;
      cityId: 0;
      users: undefined;
    };


  }

  /**
   * Init user form
   */
  initTripForm() {

    // Step 3 - Init user form
    this.tripForm = this.formBuilder.group({
      name: new FormControl(this.tripManager.name, [Validators.required, Validators.maxLength(255)]),
      dateTrip: new FormControl(this.tripManager.dateTrip, [Validators.required]),
      timeStart: new FormControl(this.tripManager.timeStart, [Validators.required]),
      timeEnd: new FormControl(this.tripManager.timeEnd, [Validators.required]),
      nbPerson: new FormControl(this.tripManager.nbPerson, [Validators.required]),
      description: new FormControl(this.tripManager.description),
      city: new FormControl(this.tripManager.cityId),
      poi: new FormControl(this.tripManager.poiId),
      ageMin: new FormControl(this.tripManager.ageMin),
      ageMax: new FormControl(this.tripManager.ageMax),
      departmentId: new FormControl(this.departmentId)
    });
    this.initCities(this.trip.city.department.id);

  }

  /**
   * Load departments and initialize the associate combo box
   */
  initDepartments() {
    this.departmentsService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  /**
   * Load cities and initialize the associate combo box
   */
  initCities(departmentId: number) {
    this.citiesService.getCitiesByDepartment(departmentId).subscribe(data => {
      this.cities = data;
    });
  }

  /**
   * Load Points of Interest and add them to the user form
   */
  initPoIs() {
    this.poisService.getPois().subscribe(data => {
      this.pois = data;
    });
  }

  /**
   * Save the current selected city
   */
  getSelectedCity(city) {
    this.selectedCity = city;
  }

  /**
   * Update City combo box when the department selection has changed
   * param departmentId
   */
  updateCitiesByDepartment(departmentId: number) {
    this.initCities(departmentId);
  }

  /**
   * Validate the trip form
   * param tripFormValues
   */
  saveTrip() {
    this.submitted = true;
    if (this.tripForm.invalid) {
      return;
    }


    const tripPost: TripManager = {
      id: this.tripManager.id,
      name: this.tripForm.controls.name.value,
      dateTrip: this.tripForm.controls.dateTrip.value,
      timeStart: this.tripForm.controls.dateTrip.value + ' ' + this.tripForm.controls.timeStart.value + ':00',
      timeEnd: this.tripForm.controls.dateTrip.value + ' ' + this.tripForm.controls.timeEnd.value + ':00',
      nbPerson: this.tripForm.controls.nbPerson.value,
      description: this.tripForm.controls.description.value,
      ageMin: this.tripForm.controls.ageMin.value,
      ageMax: this.tripForm.controls.ageMax.value,
      promoteurId: this.user.id,
      poiId: this.tripForm.controls.poi.value,
      cityId: this.tripForm.controls.city.value,
    };

    this.tripManagerService.updateTrip(tripPost).subscribe((data) => {
      this.onNotifyHideTrip.emit(data);
    });
  }

  /**
   * Reset Trip Form
   */
  resetTripForm() {
    this.submitted = false;
    this.initTripForm();
  }

  /**
   * convenience getter for easy access to form fields
   */
  get f() {
    return this.tripForm.controls;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.trip !== undefined) {

      this.tripManager.id = this.trip.id;
      this.tripManager.name = this.trip.name;
      this.tripManager.description = this.trip.description;
      this.tripManager.poiId = this.trip.poi.id;
      this.tripManager.nbPerson = this.trip.nbPerson;
      this.tripManager.ageMin = this.trip.ageMin;
      this.tripManager.ageMax = this.trip.ageMax;
      this.tripManager.dateTrip = this.trip.dateTrip;
      this.tripManager.timeStart = this.trip.timeStart;
      this.tripManager.timeEnd = this.trip.timeEnd;
      this.tripManager.cityId = this.trip.city.id;
      this.departmentId = this.trip.city.department.id;

      this.initTripForm();
    }
  }

}

