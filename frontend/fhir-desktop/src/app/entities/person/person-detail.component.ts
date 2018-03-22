import { Component } from '@angular/core';
import { PersonService } from './person.service';
import { Person } from './person';


@Component({
  selector: 'app-person-detail',
  providers: [PersonService],
  templateUrl: 'person-detail.html',
  styleUrls: ['./person.component.css']
})
export class PersonDetailComponent {
  person: Person;
  personService: PersonService;

  constructor(personService: PersonService) {
    /*this.personService.getPersons()
      .subscribe(resp => { this.person = resp; });*/
  }

}
