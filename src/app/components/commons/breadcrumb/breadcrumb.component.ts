import { Component, OnInit, SimpleChange } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() title: string;
  @Input() level1: string;
  @Input() level2: string;

  breadcrumb: string = '';
  separator: string = " > ";

  constructor() { }

  ngOnInit() {
  }

  /**
   * Update the breadcrumb when a change has been detected
   * 
   * @param change the change emiy from another component
   */
  ngOnChanges(change: SimpleChange) {
    // Get all changes
    if(change["title"] !== undefined)
      this.title = change["title"].currentValue;
    if(change["level1"] !== undefined)
      this.level1 = change["level1"].currentValue;
    if(change["level2"] !== undefined)
      this.level2 = change["level2"].currentValue;

    // Update the breadcrumb with fixed values (title + level1)
    this.breadcrumb = this.title + this.separator + this.level1;
    // Update the breacrumb with the optional level2
    if(this.level2 !== '')
      this.breadcrumb += this.separator + this.level2;
  }

}
