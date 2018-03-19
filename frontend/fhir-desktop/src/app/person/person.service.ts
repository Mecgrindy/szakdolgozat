import { Person } from './person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PersonService {
  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get<[Person]>('http://localhost:3000/api/persons');
  }
}
