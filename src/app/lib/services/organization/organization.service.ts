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
  addorganization(organaization: organization){
    
     let addedorg = this.usersCollection?.add(organaization);
     return from(addedorg);
 
  }
  getorganization(userid:string): Observable<organization[]>{

      // return this.usersCollection.valueChanges({"idField":'uid'});
    return this.firestore.collection<organization>('users',ref=>ref.where('idField',"==","uid")).valueChanges();}

  getAllOrganizations():Observable<organization[]>{
    
    return this.firestore.collection<organization>('users',ref=>ref.where('role',"==","company")).valueChanges({ "idField": 'uid' });
   }
//   deleteStudent(id: string){
//     return from(this.usersCollection.doc(id).delete());
//   }
//   updateStudent(id: string, student: organization){
//     return from(this.usersCollection.doc(id).update({...student}));
// }

}
