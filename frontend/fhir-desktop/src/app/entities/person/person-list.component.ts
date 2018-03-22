import { SidenavService } from './../../services/sidenav.service';
import { DeleteDialogComponent } from './../../modals/modals';
import { Component } from '@angular/core';
import { PersonService } from './person.service';
import { Person } from './person';
import { MatDialog, MatSidenav } from '@angular/material';

@Component({
  selector: 'app-person-list',
  providers: [PersonService],
  templateUrl: 'person-list.html',
  styleUrls: ['./person.component.css']
})
export class PersonListComponent {
  persons: [Person];
  personService: PersonService;

  constructor(public dialog: MatDialog, personService: PersonService, public sidenavService: SidenavService) {
    this.personService = personService;
    this.personService.getPersons()
      .subscribe(resp => { this.persons = resp; });
  }

  openDialog(name: string, id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { name: name, id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personService.deletePerson(result).subscribe(resp => {
          this.personService.getPersons().subscribe(resp2 => { this.persons = resp2; });
        });
      }
    });
  }

  toggleDetail(id: string) {
    if (this.sidenavService.prevId === id) {
      this.sidenavService.sidenav.close();
      this.sidenavService.prevId = '';
      return;
    }
    this.personService.getPerson(id).subscribe(resp => {
      this.sidenavService.data = resp;
    });
    this.sidenavService.sidenav.open();
    this.sidenavService.prevId = id;
  }
}
