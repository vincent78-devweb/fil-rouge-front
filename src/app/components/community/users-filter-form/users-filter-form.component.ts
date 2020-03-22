import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { UsersService } from '../../../services/users/users.service';

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

  constructor( 
    private usersService: UsersService,
    private formBuilder: FormBuilder) 
    { 
      this.filterForm = this.formBuilder.group({
        gender: '',
        age: '',
        username: '',
        region: '',
        departement: ''
      });
    }

  ngOnInit() {

  }

  /**
   * User filter form submission
   * 
   * @param userFilters 
   */
  filterUsers(userFilters) {
    //console.log(filterForm.value);
    this.usersService.filterSubject.next(userFilters);
  }

}
