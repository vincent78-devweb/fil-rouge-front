import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import * as _ from "lodash";

import { UsersService } from '../../../services/users/users.service';
import { TripsService } from '../../../services/trips/trips.service';
import { User } from '../../../models/community/user';
import { Department } from '../../../models/trips/department';
import { Poi } from '../../../models/community/poi';
import { PoisService } from '../../../services/pois/pois.service';

@Component({
  selector: 'app-checkbox-test2',
  templateUrl: './checkbox-test2.component.html',
  styleUrls: ['./checkbox-test2.component.css']
})
export class CheckboxTest2Component implements OnInit {

  userForm: FormGroup;

  availablePoIs: Poi[];
  user: User;

  selectedPoIsNames: [string];

  constructor(private usersService: UsersService, private poisService: PoisService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      pois: this.fb.array([])
    });

   }

  ngOnInit() {
    this.usersService.getUser(1).subscribe(data => {
      this.user = data;
      this.poisService.getPois().subscribe(data => {
        this.availablePoIs = data;
        // Init pois form
        this.initPoIsForm();
      });
    })

  }

  initPoIsForm() {
    this.userForm = new FormGroup({
      pois: this.createPoIs(this.availablePoIs)
    });
    this.getSelectedPoIs();
  }

  createPoIs(poisInputs) {
    const arr = poisInputs.map(poi => {

      for(let i = 0; i < this.user.pois.length; i++) {
        if(poi.id === this.user.pois[i].id) {
          poi.selected  = true;
          break;
        }
      }
      return new FormControl(poi.selected || false);
    });
    return new FormArray(arr);
  }

  getSelectedPoIs() {
    this.selectedPoIsNames = _.map(
      this.userForm.controls.pois["controls"],
      (poi, i) => {
        return poi.value && this.availablePoIs[i];
      }
    );
    console.log(this.selectedPoIsNames);


  }

  onSubmit(){
    let selectedPoIs: Poi[] =  [];
    for(let i=0; i < this.userForm.controls.pois["controls"].length; i++) {
      //console.log(this.userForm.controls.pois["controls"][i]);
      if(this.userForm.controls.pois["controls"][i].value) {
        selectedPoIs.push({id: this.availablePoIs[i].id, name: this.availablePoIs[i].name});
      }
    }

    console.log(selectedPoIs);
  }
}
