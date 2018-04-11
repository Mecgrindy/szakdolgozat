import { Injectable } from '@angular/core';
import { Person } from '../../entities/person/person';

@Injectable()
export class SidenavService {
  public sidenav: any;
  public prevId: string;
  public data: Person;
}
