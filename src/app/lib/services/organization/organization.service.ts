import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { organization } from '../../inteerfaces/organization';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  usersCollection!: AngularFirestoreCollection<organization>
  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection('users');
   }
  addStudent(student: organization){
    
     let addedStudent = this.usersCollection?.add(student);
     return from(addedStudent);
 
  }
  getStudents(): Observable<organization[]>{

      return this.usersCollection.valueChanges({"idField":'uid'});
  }
  getStudentById(id : string){
     return this.usersCollection.doc(id).valueChanges();
  }
  deleteStudent(id: string){
    return from(this.usersCollection.doc(id).delete());
  }
  updateStudent(id: string, student: organization){
    return from(this.usersCollection.doc(id).update({...student}));
}

}
