import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { collection, collectionChanges } from '@angular/fire/firestore';
import { where } from '@firebase/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { apply } from '../../inteerfaces/apply';
import { opportunity } from '../../inteerfaces/opportunity';
@Injectable({
  providedIn: 'root'
})
export class OportunitiesService {
private opportunitiesCollection : AngularFirestoreCollection<opportunity>;
  constructor(private firestore :AngularFirestore, private fireAuth:AngularFireAuth) {
          this.opportunitiesCollection = this.firestore.collection("oportunities");
}

    
  

   
  addOpportunity(opportunity:opportunity){
    console.log(opportunity);
let addedOpportunity = this.opportunitiesCollection.add(opportunity);console.log(addedOpportunity);
return from(addedOpportunity);
   }

   getOpportunities(userid:string):Observable<opportunity[]>{
    return this.firestore.collection<opportunity>('oportunities',ref=>ref.where('userid',"==",userid)).valueChanges({"idField":'id'});
   }
   getAllOpportunities(): Observable<opportunity[]>{

    return this.firestore.collection<opportunity>('oportunities').valueChanges({ "idField": 'id'});
}
getoportunityById(id : string):Observable<opportunity | undefined>{

  return this.opportunitiesCollection.doc(id).valueChanges();
}

addApplicant(activityid:string, obj:apply) {
  this.firestore.collection('oportunities/' + activityid + '/applicants').add(obj);
 }
 countApplicant(activityid:string):Observable<any> {
 return this.firestore.collection('oportunities/' + activityid + '/applicants').snapshotChanges();
    
  }
  updatecount(activityid:string, numberOfApplicants:number){
    console.log(numberOfApplicants);
    return from(this.opportunitiesCollection.doc<opportunity>(activityid).update({numberOfApplicants: numberOfApplicants}));
    
  }
updatid(id: string){
  return from(this.opportunitiesCollection.doc<opportunity>(id).update({id: id}));
}
}
