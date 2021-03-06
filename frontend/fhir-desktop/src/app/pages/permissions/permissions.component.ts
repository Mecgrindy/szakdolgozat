import { PermService } from './perm.service';
import { config } from './../../app.config';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { of as observableOf } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { FormGroup, FormControl } from '@angular/forms';
import { Acl } from '../../entities/acl/acl';
import { DeleteDialogComponent } from '../../modals/modals';

@Component({
  selector: 'app-permissions',
  providers: [PermService],
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  displayedColumns = ['appname', 'patname', 'resname', 'c', 'r', 'u', 'd', 'from',
    'to', 'requestername', 'providername', 'when', 'edit', 'active', 'delete'];
  exampleDatabase: PermHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  viewName = 'acl';
  permForm: FormGroup | null;
  init = false;
  lastId = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog, public permService: PermService) {
    this.permForm = new FormGroup({
      active: new FormControl(false),
      appname: new FormControl(''),
      patname: new FormControl(''),
      resname: new FormControl(''),
      requestername: new FormControl(''),
      providername: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl(''),
      when: new FormControl(''),
      whenadj: new FormControl(''),
      expired: new FormControl(false)
    });
  }

  ngOnInit() {
    this.exampleDatabase = new PermHttpDao(this.http);
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.lastId = '';
      this.Filter();
    });
    this.getNumberofAcls();
    this.Filter();
  }
  clearControl(control: string) {
    this.permForm.controls[control].setValue('');
  }
  clearFilter() {
    this.permForm.reset();
    this.Filter();
  }

  Filter() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.viewName = 'acl';
          let limit = 0;
          if (this.sort.active !== undefined && this.sort.direction !== '') {
            this.viewName += this.sort.active + this.sort.direction;
          }
          if (this.paginator.pageSize === undefined) {
            this.paginator.pageSize = 5;
          }
          limit = this.paginator.pageSize;
          if (this.paginator.pageIndex === 0) {
            this.lastId = '';
          }
          if (this.paginator.pageIndex * this.paginator.pageSize > this.resultsLength) {
            limit = this.resultsLength - this.paginator.pageIndex - 1 * this.paginator.pageSize;
          }
          // tslint:disable-next-line:no-non-null-assertion
          return this.exampleDatabase!.getPerms(this.viewName, this.permForm, this.lastId, limit);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.getNumberofAcls();
          // this.resultsLength = 100;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.lastId = '';
        if (data[data.length - 1]) {
          this.lastId = data[data.length - 1].id;
        }
        this.dataSource.data = data;
      });
  }

  getNumberofAcls() {
    this.permService.Count().subscribe(resp => {
      this.resultsLength = resp;
    });
  }
  openDialog(title: string, id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { title: title, id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.permService.deletePerm(result).subscribe(resp => {
          const index = this.dataSource.data.findIndex(function (x: Acl) { return x.id === id; });
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        });
      }
    });
  }
  toggleActivity(acl: Acl) {
    acl.active = !acl.active;
    this.permService.updatePerm(acl).subscribe(resp => {
      const index = this.dataSource.data.findIndex(function (x: Acl) { return x.id === resp.id; });
      this.dataSource.data[index] = resp;
      this.dataSource._updateChangeSubscription();
    });
  }
  getAccess(accessLevel: number, index: number) {
    let bin: string = accessLevel.toString(2);
    if (bin.length !== 4) {
      const nmbnull = 4 - bin.length;
      for (let i = 0; i < nmbnull; i++) {
        bin = '0' + bin;
      }
    }
    return bin[index];
  }
  setAccess(acl: Acl, numb: number, checkState: string) {
    if (Number(checkState)) {
      numb = -numb;
    }
    acl.accesslevel += numb;
    this.permService.updatePerm(acl).subscribe(resp => {
      const index = this.dataSource.data.findIndex(function (x: Acl) { return x.id === resp.id; });
      this.dataSource.data[index] = resp;
      this.dataSource._updateChangeSubscription();
    });
  }
}

export class PermHttpDao {
  constructor(private http: HttpClient) { }

  getPerms(viewName: string, permForm: FormGroup, lastId: string, limit: number): Observable<[Acl]> {
    console.log(lastId + '' + limit);
    let requestUrl = '?viewname=' + viewName;
    Object.keys(permForm.controls).forEach(key => {
      const control = permForm.get(key);
      if (control.value !== '' && control.value != null) {
        requestUrl += '&' + key + '=' + control.value;
      }
    });
    requestUrl += '&limit=' + limit;
    if (lastId !== '') {
      requestUrl += '&lastId=' + lastId;
    }
    return this.http.get<[Acl]>(config.apiHostAcl + 'acls' + requestUrl);
  }
}
