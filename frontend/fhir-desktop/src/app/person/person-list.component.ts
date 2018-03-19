import { Component } from '@angular/core';
import { PersonService } from './person.service';
import { Person } from './person';

@Component({
  selector: 'app-person-list',
  providers: [PersonService],
  template: `
  <mat-card class="person-card" *ngFor="let person of persons">
  <mat-card-header>
    <div mat-card-avatar class="person-header-image"></div>
    <mat-card-title>Identifier
    </mat-card-title>
    <mat-card-subtitle>
      <b>{{person.name[0]}}</b> (Male)</mat-card-subtitle>
    <span class="toolbar-spacer"></span>
    <button mat-icon-button [matMenuTriggerFor]="personMenu">
      <mat-icon>more_vert</mat-icon>
    </button>
  </mat-card-header>
  <mat-card-content class="person-content-pad">
    <p>
      &nbsp; 1997-12-17
    </p>
  </mat-card-content>
  <mat-card-actions class="person-action-pad">
    <button mat-button>ORGANIZATION ORG</button>
    <button mat-button>LINKS 4</button>
  </mat-card-actions>
</mat-card>
<mat-menu #personMenu="matMenu">
  <button mat-menu-item>
    <mat-icon>edit</mat-icon>
    <span>Edit</span>
  </button>
  <button mat-menu-item>
    <mat-icon>delete</mat-icon>
    <span>Delete</span>
  </button>
</mat-menu>
  `,
  styleUrls: ['./person.component.css']
})
export class PersonListComponent {
  persons: [Person];

  constructor(personService: PersonService) {
    personService.getPersons()
      .subscribe(resp => { this.persons = resp; });
  }
}
