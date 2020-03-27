import { Component, OnInit } from '@angular/core';
import {PoisService} from '../../../services/pois/pois.service';
import {RegionService} from '../../../services/region/region.service';
import {DepartmentsService} from '../../../services/departments/departments.service';
import {TripsService} from '../../../services/trips/trips.service';
import {Poi} from '../../../models/commons/poi';
import {Region} from '../../../models/zone/region';
import {Department} from '../../../models/zone/department';
import {FormBuilder} from '@angular/forms';
import {TripFilters} from '../../../models/trips/trip-filters';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css']
})
export class TripCreateComponent implements OnInit {

  pois: Poi[];
  regions: Region[];
  departments: Department[];
  cities: Department[];

  tripForm;

  constructor(
    private poiService: PoisService,
    private regionService: RegionService,
    private departmentsService: DepartmentsService,
    // private citiesService: CityService,

    private tripsService: TripsService,
    private formBuilder: FormBuilder) {
    this.tripForm = this.formBuilder.group({
      poiId: '',
      regionId: '',
      departmentId: ''
    //  cityId
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
   * Update Department combo box if the selected region changes
   *
   * @param regionId
   */
  onChangeDepartment(departmentId: number) {
   /* if(departmentId == 0){
        this.departments = data;
      });
    } else {
      // All departments of one region
      this.departmentsService.getDepartmentsByRegion(regionId).subscribe(data => {
        this.departments = data;
      });
    } */
  }


  /**
   * User filter form submission
   *
   * @param tripFilters
   */
  saveTrip() {

 /*   if(tripFilters.poiId === undefined)
      tripFilters.poiId = 0;

    if(tripFilters.regionId === undefined)
      tripFilters.regionId = 0;

    if(tripFilters.departmentId === undefined)
      tripFilters.departmentId = 0;
*/

 //   this.tripsService.filterSubject.next(tripFilters);
  }


}
