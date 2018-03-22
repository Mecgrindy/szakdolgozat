import { Organization } from './organization';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app.config';

@Injectable()
export class OrganizationService {
  constructor(private http: HttpClient) { }

  getOrganizations() {
    return this.http.get<[Organization]>(config.apiHost + 'organizations');
  }
}
