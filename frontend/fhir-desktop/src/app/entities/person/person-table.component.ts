import { DeleteDialogComponent } from './../../modals/modals';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PersonService } from './person.service';
import { Person } from './person';
import { MatDialog, MatSidenav, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { SelectionModel } from '@angular/cdk/collections';
import { SidenavService } from '../../services/sidenav.service';
import { config } from '../../app.config';


@Component({
  selector: 'app-person-table',
  providers: [PersonService],
  templateUrl: 'person-table.html',
  styleUrls: ['./person.component.css']
})
export class PersonTableComponent implements OnInit {
  displayedColumns = ['select', 'identifier', 'email', 'nametext', 'birthdate', 'gender', 'view', 'edit', 'delete'];
  personDatabase: PersonHttpDao | null;
  dataSource = new MatTableDataSource<Person>();
  isLoadingResults = true;
  isError = false;
  persons: [Person];
  personService: PersonService;
  selection: SelectionModel<Person>;
  viewName = 'person';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, private http: HttpClient, personService: PersonService, public sidenavService: SidenavService) {
    this.personService = personService;
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Person>(allowMultiSelect, initialSelection);
  }
  ngOnInit() {
    this.personDatabase = new PersonHttpDao(this.http);
    this.getPersons();
  }
  getPersons() {
    merge(this.sort.sortChange, this.paginator.page).pipe(startWith({}), switchMap(() => {
      this.isLoadingResults = true;
      this.viewName = 'person';
      if (this.sort.active !== undefined && this.sort.direction !== '') {
        this.viewName += this.sort.active + this.sort.direction;
      }
      // tslint:disable-next-line:no-non-null-assertion
      return this.personDatabase!.getPersons(this.viewName);
    }), map(data => {
      this.isLoadingResults = false;
      return data;
    }), catchError(() => {
      this.isLoadingResults = false;
      this.isError = true;
      return observableOf([]);
    })
    ).subscribe(data => {
      this.dataSource.data = data;
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  openDialog(name: any, id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { title: name, id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personService.deletePerson(result).subscribe(resp => {
          this.getPersons();
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

export class PersonHttpDao {
  constructor(private http: HttpClient) { }

  getPersons(viewName: string): Observable<[Person]> {
    return this.http.get<[Person]>(config.apiHostPerson + 'persons' + '?viewname=' + viewName);
  }
}
