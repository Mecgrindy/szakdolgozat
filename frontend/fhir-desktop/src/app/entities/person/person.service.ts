import { Person, PersonCount } from './person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app.config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonService {
  constructor(private http: HttpClient) { }

  getPersons(): Observable<[Person]> {
    return this.http.get<[Person]>(config.apiHost + 'persons');
  }

  getCount() {
    return this.http.get<PersonCount>(config.apiHost + 'persons/count');
  }

  deletePerson(id: string) {
    return this.http.delete(config.apiHost + 'persons/' + id);
  }

  getPerson(id: string) {
    return this.http.get<Person>(config.apiHost + 'persons/' + id);
  }
}
