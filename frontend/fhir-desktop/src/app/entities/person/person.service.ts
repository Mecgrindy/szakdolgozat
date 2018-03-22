import { Person } from './person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app.config';

@Injectable()
export class PersonService {
  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get<[Person]>(config.apiHost + 'persons');
  }

  deletePerson(id: string) {
    return this.http.delete(config.apiHost + 'persons/' + id);
  }

  getPerson(id: string) {
    return this.http.get<Person>(config.apiHost + 'persons/' + id);
  }
}
