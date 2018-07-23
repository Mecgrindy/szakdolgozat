import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app.config';
import { Observable } from 'rxjs/Observable';
import { Acl } from '../../entities/acl/acl';

@Injectable()
export class PermService {
  constructor(private http: HttpClient) { }

  deletePerm(id: string) {
    return this.http.delete(config.apiHostAcl + 'acls/' + id);
  }

  addPerm(acl: Acl) {
    return this.http.post<Acl>(config.apiHostAcl + 'acls/', { 'data': acl });
  }

  Count() {
    return this.http.get<number>(config.apiHostAcl + 'acls/count');
  }

  updatePerm(acl: Acl) {
    return this.http.post<Acl>(config.apiHostAcl + 'acls/updateOne', { 'data': acl });
  }
}
