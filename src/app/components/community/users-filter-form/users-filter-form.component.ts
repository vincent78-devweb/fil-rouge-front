import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { UsersService } from '../../../services/users/users.service';
import { TripsService } from '../../../services/trips/trips.service';
import { Region } from '../../../models/zone/region';
import { Department } from '../../../models/zone/department';

@Component({
  selector: 'app-users-filter-form',
  templateUrl: './users-filter-form.component.html',
  styleUrls: ['./users-filter-form.component.css']
})
export class UsersFilterFormComponent implements OnInit {

  filterForm;

  lastname: string;
  firstname: string;
  city: string;

  regions: Region[];
  departments: Department[];

  constructor(
    private usersService: UsersService,
    private tripsService: TripsService,
    private formBuilder: FormBuilder)
    {
      this.filterForm = this.formBuilder.group({
        gender: '',
        ageCategory: '',
        pseudo: '',
        regionId: '',
        departmentId: ''
      });
    }

  ngOnInit() {
    this.tripsService.getRegions().subscribe(data => {
      this.regions = data;
    });

    this.tripsService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  /**
   * Update Department combo box if the selected region changes
   *
   * @param regionId
   */
  onChangeRegion(regionId: number) {
    if(regionId == 0){
      // All regions
      this.tripsService.getDepartments().subscribe(data => {
        this.departments = data;
      });
    } else {
      // All departments of one region
      this.tripsService.getDepartmentsByRegion(regionId).subscribe(data => {
        this.departments = data;
      });
    }
  }


  /**
   * User filter form submission
   *
   * @param userFilters
   */
  filterUsers(userFilters) {
    if(userFilters.gender === undefined)
      userFilters.gender = "";

    if(userFilters.ageCategory === undefined)
      userFilters.ageCategory = "";

    if(userFilters.pseudo === undefined)
      userFilters.pseudo = "";

    if(userFilters.regionId === undefined)
      userFilters.regionId = 0;

    if(userFilters.departmentId === undefined)
      userFilters.departmentId = 0;

    this.usersService.filterSubject.next(userFilters);
  }

}
