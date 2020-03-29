import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UsersService} from '../../../services/users/users.service';
import {CitiesService} from '../../../services/cities/cities.service';
import {User} from '../../../models/community/user';
import {Department} from '../../../models/zone/department';
import {PoisService} from '../../../services/pois/pois.service';
import {City} from '../../../models/zone/city';
import {DepartmentsService} from '../../../services/departments/departments.service';
import {Poi} from '../../../models/commons/poi';
import {TripManager} from '../../../models/trips/trip-manager';
import {TripManagerService} from '../../../services/TripManager/trip-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css']
})
export class TripCreateComponent implements OnInit,  AfterViewInit {
  // Breadcrumb parameters
  title = 'Sortir';
  level1 = 'Créer une sortie';
  level2 = '';

  departments: Department[];
  pois: Poi[];
  cities: City[];

  tripForm: FormGroup;
  submitted = false;
  selectedCity = undefined;

  user: User;
  tripManager: TripManager = undefined;

  person: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  // tslint:disable-next-line:max-line-length
  ages: number[] = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];

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
    // Init user form
    this.tripManager = new class implements TripManager {
      id: undefined;
      name: '';
      description: '';
      dateTrip: '';
      timeStart: '';
      timeEnd: '';
      nbPerson: 0;
      ageMin: 0;
      ageMax: 0;
      promoteurId: undefined;
      poiId: undefined;
      cityId: undefined;
      users: undefined;
    };

    // Load current user
    this.user = this.usersService.currentUser;

    this.initTripForm() ;
    this.initDepartments();
    this.initPoIs();
  }

  ngAfterViewInit(): void {
    // Load current user
    this.user = this.usersService.currentUser;
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

    this.tripManagerService.createTrip(tripPost).subscribe(() => {
      this.router.navigateByUrl('/my-trips');
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

  /**
   * Init user form
   */
  initTripForm() {
    this.tripForm = this.formBuilder.group({
      name: new FormControl(this.tripManager.name, [Validators.required, Validators.maxLength(255)]),
      dateTrip: new FormControl(this.tripManager.dateTrip, [Validators.required]),
      timeStart: new FormControl(this.tripManager.timeStart, [Validators.required]),
      timeEnd: new FormControl(this.tripManager.timeEnd, [Validators.required]),
      nbPerson: new FormControl('', [Validators.required]),
      description: new FormControl(),
      city: new FormControl(),
      poi: new FormControl('', [Validators.required]),
      ageMin: new FormControl(''),
      ageMax: new FormControl(''),
      departmentId: new FormControl()
    });
  }
}

