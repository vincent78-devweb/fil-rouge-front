import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { TripsService } from '../../../services/trips/trips.service';
import { RegionService } from '../../../services/region/region.service';
import { DepartmentsService} from '../../../services/departments/departments.service';

import { Region } from '../../../models/zone/region';
import { Department } from '../../../models/zone/department';
import {UsersService} from '../../../services/users/users.service';
import {Poi} from '../../../models/commons/poi';
import {PoisService} from '../../../services/pois/pois.service';
import {TripFilters} from '../../../models/trips/trip-filters';

@Component({
  selector: 'app-trips-manager-filter-form',
  templateUrl: './trips-manager-filter-form.component.html',
  styleUrls: ['./trips-manager-filter-form.component.css']
})
export class TripsManagerFilterFormComponent implements OnInit {

  isFormVisible = true;
  filterForm;

  city: string;

  pois: Poi[];
  regions: Region[];
  departments: Department[];

  constructor(
    private poiService: PoisService,
    private regionService: RegionService,
    private departmentsService: DepartmentsService,
    private tripsService: TripsService,
    private formBuilder: FormBuilder)
  {
    this.filterForm = this.formBuilder.group({
      poiId: '',
      regionId: '',
      departmentId: '',
      keywords: '',
      startDate: '' ,
    });
  }

  ngOnInit() {
    this.poiService.getPois().subscribe(data => {
      this.pois = data;
    });

    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });

    this.departmentsService.getDepartments().subscribe(data => {
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
      this.departmentsService.getDepartments().subscribe(data => {
        this.departments = data;
      });
    } else {
      // All departments of one region
      this.departmentsService.getDepartmentsByRegion(regionId).subscribe(data => {
        this.departments = data;
      });
    }
  }

  /**
   * User filter form submission
   *
   * @param tripFilters
   */
  filterTrips(tripFilters: TripFilters) {

    if(tripFilters.poiId === undefined)
      tripFilters.poiId = 0;

    if(tripFilters.regionId === undefined)
      tripFilters.regionId = 0;

    if(tripFilters.departmentId === undefined)
      tripFilters.departmentId = 0;

    if(tripFilters.keywords === undefined)
      tripFilters.keywords = '';

    tripFilters.userId = 0;

    console.log(tripFilters)
    this.tripsService.filterSubject.next(tripFilters);
  }

}
