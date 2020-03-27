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
  selector: 'app-checkbox-test1',
  templateUrl: './checkbox-test1.component.html',
  styleUrls: ['./checkbox-test1.component.css']
})
export class CheckboxTest1Component implements OnInit {

  form: FormGroup;
  Data: Array<any> = [
    { name: 'Pear', value: 'pear' },
    { name: 'Plum', value: 'plum' },
    { name: 'Kiwi', value: 'kiwi' },
    { name: 'Apple', value: 'apple' },
    { name: 'Lime', value: 'lime' }
  ];

  pois: Poi[];

  personForm: FormGroup;
  selectedHobbiesNames: [string];
  myhobbies: any = [
    {
      name: "Sports",
      value: "sports"
    },
    {
      name: "Music",
      value: "music",
      selected: true
    },
    {
      name: "Movie",
      value: "movie",
      selected: true
    },
    {
      name: "Reading",
      value: "reading"
    },
    {
      name: "Writing",
      value: "writing"
    }
  ];

  constructor(private usersService: UsersService, private tripsService: TripsService, private poisService: PoisService, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    });
  }

  ngOnInit() {
    this.poisService.getPois().subscribe(data => {
      this.pois = data;
    });
    this.createFormInputs();
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm(){
    const selectedOrderIds = this.form.value.checkArray
      .map((v, i) => (v ? this.pois[i].id : null))
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }


  createFormInputs() {
    this.personForm = new FormGroup({
      hobbies: this.createHobbies(this.myhobbies)
    });
    this.getSelectedHobbies();
  }

  createHobbies(hobbiesInputs) {
    const arr = hobbiesInputs.map(hobby => {
      return new FormControl(hobby.selected || false);
    });
    return new FormArray(arr);
  }

  getSelectedHobbies() {
    this.selectedHobbiesNames = _.map(
      this.personForm.controls.hobbies["controls"],
      (hobby, i) => {
        return hobby.value && this.myhobbies[i].value;
      }
    );
    this.getSelectedHobbiesName();
  }

  getSelectedHobbiesName() {
    this.selectedHobbiesNames = _.filter(
      this.selectedHobbiesNames,
      function(hobby) {
        if (hobby !== false) {
          return hobby;
        }
      }
    );
  }

  onSubmit(){
    
  }

}
