import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { organization } from '../../inteerfaces/organization';
import { OportunitiesService } from '../oportunities/oportunities.service';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  usersCollection!: AngularFirestoreCollection<organization>
  constructor(private firestore: AngularFirestore, private oppservice:OportunitiesService) {
    this.usersCollection = this.firestore.collection('users');
   }
  addorganization(organaization: organization ){
    
     let addedorg = this.usersCollection?.add(organaization);
     return from(addedorg);
 
  }
  getorganization(userid:string):Observable<organization | undefined>{
    return this.usersCollection.doc(userid).valueChanges({ "idField": 'id' });;   }
    
  getAllOrganizations():Observable<organization[]>{
    
    return this.firestore.collection<organization>('users',ref=>ref.where('role',"==","company")).valueChanges({ "idField": 'id' });
   }
//   deleteStudent(id: string){
//     return from(this.usersCollection.doc(id).delete());
//   }
 updateStudent(id: string, org: organization){   
  this.oppservice.updatcompany(id,org.name, org.logo);
   return from(this.usersCollection.doc(id).update({...org}));
}

}
