import { Injectable } from '@angular/core';
import { person } from '../inteerfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
persons:person[]=[];
  constructor() { }
  addPerson(person:person){
this.persons.push(person);
  }
  getperson():person[]{
    return this.persons;
  }
}
