import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app.config';
import { Observable } from 'rxjs/Observable';
import { Acl } from '../../entities/acl/acl';

@Injectable()
export class PermService {
  constructor(private http: HttpClient) { }

  deletePerm(id: string) {
    return this.http.delete(config.apiHost + 'acls/' + id);
  }

  addPerm(acl: Acl) {
    return this.http.post<Acl>(config.apiHost + 'acls/', { 'data': acl });
  }

  updatePerm(acl: Acl) {
    return this.http.post<Acl>(config.apiHost + 'acls/updateOne', { 'data': acl });
  }
}
