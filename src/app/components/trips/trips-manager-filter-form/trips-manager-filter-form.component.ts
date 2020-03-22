import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips-manager-filter-form',
  templateUrl: './trips-manager-filter-form.component.html',
  styleUrls: ['./trips-manager-filter-form.component.css']
})
export class TripsManagerFilterFormComponent implements OnInit {

  isFormVisible = true;
  
  constructor() { }

  ngOnInit() {
  }

}
