import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { person } from '../../inteerfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  usersCollection!: AngularFirestoreCollection<person>
  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
   }
  addStudent(student: person){
    
     let addedStudent = this.usersCollection?.add(student);
     return from(addedStudent);
 
  }
  getStudents(): Observable<person[]>{

      return this.usersCollection.valueChanges({"idField":'uid'});
  }
  getrole(userid:string):Observable<person[]>{
    return this.firestore.collection<person>('users',ref=>ref.where('userid',"==",userid)).valueChanges();
   }

}
