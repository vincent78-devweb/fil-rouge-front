import {Component, OnInit} from '@angular/core';import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UsersService} from '../../../services/users/users.service';
import {TripsService} from '../../../services/trips/trips.service';
import {CitiesService} from '../../../services/cities/cities.service';
import {User} from '../../../models/community/user';
import {Department} from '../../../models/zone/department';
import {PoiElt} from '../../../models/commons/poi-elt';
import {PoisService} from '../../../services/pois/pois.service';
import {City} from '../../../models/zone/city';
import {UserPut} from '../../../models/community/user-put';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  // Breadcrumb parameters
  title: string = "Administration";
  level1: string = "Mon profil utilisateur";
  level2: string = "";

  departments: Department[];

  userForm: FormGroup;
  submitted = false;
  selectedCity = undefined;

  user: User;
  availablePoIs: PoiElt[];
  cities: City[];

  constructor(private usersService: UsersService, private citiesService: CitiesService, private tripsService: TripsService, private poisService: PoisService,
    private formBuilder: FormBuilder) {
    // Init form to avoid an error when the component is rendered
    this.userForm = this.formBuilder.group({
      login: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      gender: new FormControl(),
      email: new FormControl(),
      birthday: new FormControl(),
      departmentId: new FormControl(),
      city: new FormControl(),
      avatar: new FormControl(),
      description: new FormControl(),
      pois: new FormArray([])
    });
  }

  ngOnInit() {
    // Init user form
    this.initUserForm();
  }

  /**
   * Init user form
   */
  initUserForm() {
    // Load current user
    this.user = this.usersService.currentUser;

    // Step 3 - Init user form
    this.userForm = this.formBuilder.group({
      login: new FormControl(this.user.login, [Validators.required, Validators.maxLength(255)]),
      firstname: new FormControl(this.user.firstname, [Validators.required, Validators.maxLength(255)]),
      lastname: new FormControl(this.user.lastname, [Validators.required, Validators.maxLength(255)]),
      gender: new FormControl(this.user.gender),
      email: new FormControl(this.user.email, [Validators.required, Validators.email, Validators.maxLength(255)]),
      birthday: new FormControl(this.user.birthday, [Validators.required]),
      departmentId: new FormControl(this.user.city.department.id),
      city: new FormControl(this.user.city.name),
      avatar: new FormControl(this.user.avatar, [Validators.maxLength(255)]),
      description: new FormControl(this.user.description),
      pois: new FormArray([])
    });

    // Dependancy 1 - Load departments
    this.initDepartments();
    // Dependancy 2 - Load cities from a department
    this.initCities(this.user.city.department.id);
    // Dependancy 3 - Load PoIs
    this.initPoIs();
  }

  /**
   * Load departments and initialize the associate combo box
   */
  initDepartments() {
    this.tripsService.getDepartments().subscribe(data => {
      // Generate the combo box
      this.departments = data;
      // Set the user default value
      this.userForm.controls.departmentId.setValue(this.user.city.department.id);
    });
  }

  /**
   * Load cities and initialize the associate combo box
   */
  initCities(departmentId: number) {
    this.citiesService.getCitiesByDepartment(departmentId).subscribe(data => {
      // Generate the combo box
      this.cities = data;
      // Set the user default value
      this.userForm.controls.city.setValue(this.user.city.id);
      this.selectedCity = this.user.city.id;
    });
  }

  /**
   * Load Points of Interest and add them to the user form
   */
  initPoIs() {
    this.poisService.getPois().subscribe(data => {
      this.availablePoIs = data;
      // Generate the user PoIs form
      this.userForm.controls.pois = this.createPoIs(this.availablePoIs);
    });
  }

  /**
   * Generate all PoI combo boxes for the current user
   */
  private createPoIs(poisInputs) {
    const arr = poisInputs.map(poi => {

      for (let i = 0; i < this.user.pois.length; i++) {
        if (poi.id === this.user.pois[i].id) {
          poi.selected = true;
          break;
        }
      }
      return new FormControl(poi.selected || false);
    });
    return new FormArray(arr);
  }

  /**
   * Save the current selected city
   */
  getSelectedCity(city) {
    this.selectedCity = city;
  }

  /**
   * Update City combox box when the department selection has changed
   * @param departmentId
   */
  updateCitiesByDepartment(departmentId: number) {
    this.initCities(departmentId);
  }

  /**
   * Validate the user form
   * @param userFormValues
   */
  saveUser(userFormValues) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    // Get selected PoIs
    let selectedPoIs: PoiElt[] = [];
    for (let i = 0; i < this.userForm.controls.pois["controls"].length; i++) {
      //console.log(this.userForm.controls.pois["controls"][i]);
      if (this.userForm.controls.pois["controls"][i].value) {
        selectedPoIs.push({ id: this.availablePoIs[i].id, name: this.availablePoIs[i].name });
      }
    }

    // Set user infos
    let cityToSave = undefined;
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].id == this.selectedCity) {
        cityToSave = this.cities[i];
        break;
      }
    }

    let userPost: UserPut = {
      id: this.user.id,
      firstname: this.userForm.controls.firstname.value,
      lastname: this.userForm.controls.lastname.value,
      login: this.userForm.controls.login.value,
      email: this.userForm.controls.email.value,
      gender: this.userForm.controls.gender.value,
      avatar: this.userForm.controls.avatar.value,
      description: this.userForm.controls.description.value,
      birthday: this.userForm.controls.birthday.value,
      city: cityToSave,
      pois: selectedPoIs
    }

    //console.log(userPost);
    this.usersService.saveUser(userPost, this.user.id);
  }

  /**
   * Reset User Form
   */
  resetUserForm() {
    this.submitted = false;
    this.initUserForm();
  }

  /**
   * convenience getter for easy access to form fields
   */
  get f() { return this.userForm.controls; }

}
