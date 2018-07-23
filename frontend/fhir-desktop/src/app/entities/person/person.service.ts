import { Person } from './person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app.config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonService {
  constructor(private http: HttpClient) { }

  getPersons(): Observable<[Person]> {
    return this.http.get<[Person]>(config.apiHostPerson + 'persons');
  }

  addPerson(person: Person) {
    return this.http.post<Person>(config.apiHostPerson + 'persons/', { 'personData': person });
  }

  deletePerson(id: string) {
    return this.http.delete(config.apiHostPerson + 'persons/' + id);
  }

  getPerson(id: string) {
    return this.http.get<Person>(config.apiHostPerson + 'persons/' + id);
  }
}
