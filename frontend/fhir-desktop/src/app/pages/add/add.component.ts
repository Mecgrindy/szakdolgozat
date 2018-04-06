import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  routeNames: string[];
  genders: string[];

  constructor() {
    this.routeNames = ['person', 'patient', 'group', 'organization', 'careteam'];
    this.genders = ['male', 'female', 'other', 'unknown'];
  }

  ngOnInit() {
  }

}
