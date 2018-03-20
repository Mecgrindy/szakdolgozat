import { Group } from './group';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../app.config';

@Injectable()
export class GroupService {
  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get<[Group]>(config.apiHost + 'groups');
  }
}
