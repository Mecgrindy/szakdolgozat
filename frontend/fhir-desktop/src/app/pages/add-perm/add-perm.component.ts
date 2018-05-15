import { Acl } from './../../entities/acl/acl';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PermService } from '../permissions/perm.service';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';


export class App {
  constructor(public name: string, public id: string) { }
}
@Component({
  selector: 'app-add-perm',
  providers: [PermService],
  templateUrl: './add-perm.component.html',
  styleUrls: ['./add-perm.component.css']
})
export class AddPermComponent implements OnInit {
  addPermForm: FormGroup | null;
  startValues = {
    active: false, accesslevel: 0, providername: 'Lacika',
    appname: 'App1', resname: 'defresname', patname: 'defpatname', requestername: 'defrequestername',
    start: (new Date()).toISOString(), end: (new Date()).toISOString(), when: (new Date()).toISOString()
  };
  filteredApps: Observable<any[]>;

  apps: App[] = [
    {
      name: 'App1',
      id: 'id1',
    },
    {
      name: 'App2',
      id: 'id2',
    },
    {
      name: 'App3',
      id: 'id3',
    },
    {
      name: 'App4',
      id: 'id4',
    }
  ];

  constructor(public permService: PermService) {
    this.addPermForm = new FormGroup({
      active: new FormControl(),
      appname: new FormControl(),
      patname: new FormControl(),
      resname: new FormControl(),
      requestername: new FormControl(),
      providername: new FormControl(),
      start: new FormControl(),
      end: new FormControl(),
      when: new FormControl(),
      accesslevel: new FormControl()
    });
    this.addPermForm.setValue(this.startValues);
    this.filteredApps = this.addPermForm.controls.appname.valueChanges
      .pipe(
        startWith(''),
        map(app => app ? this.filterStates(app) : this.apps.slice())
      );
  }

  ngOnInit() {
  }

  filterStates(name: string) {
    return this.apps.filter(app =>
      app.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  Add() {
    this.permService.addPerm(this.addPermForm.value).subscribe(resp => { });
  }
  Clear() {
    this.addPermForm.reset(this.startValues);
  }
}
