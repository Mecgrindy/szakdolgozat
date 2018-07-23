import { PersonService } from './../../entities/person/person.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  providers: [PersonService],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addPersonForm: FormGroup | null;
  // startValues = {};

  constructor(public personService: PersonService) {
    this.addPersonForm = new FormGroup({
      identifier: new FormControl(),
      nametext: new FormControl(),
      email: new FormControl(),
      gender: new FormControl('Male'),
      birthdate: new FormControl(),
      active: new FormControl(true),
      name: new FormControl(),
      telecom: new FormControl(),
      address: new FormControl(),
      photo: new FormControl(),
      managingOrganization: new FormControl(),
      link: new FormControl(),
      extension: new FormControl()
    });
    // this.addPersonForm.setValue(this.startValues);
  }

  ngOnInit() {
  }

  Add() {
    if (this.addPersonForm.valid) {
      this.personService.addPerson(this.addPersonForm.value).subscribe(resp => { });
    }
  }
}
