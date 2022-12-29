import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { where } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { opportunity } from '../../inteerfaces/opportunity';
@Injectable({
  providedIn: 'root'
})
export class OportunitiesService {
private opportunitiesCollection! : AngularFirestoreCollection<opportunity>;
  constructor(private firestore :AngularFirestore) {
this.opportunitiesCollection = this.firestore.collection('oppoptunities');


   }
   addOpportunity(opportunity:opportunity){
let addedOpportunity = this.opportunitiesCollection.add(opportunity);console.log(addedOpportunity);
return from(addedOpportunity);
   }
   getOpportunities(userid:string):Observable<opportunity[]>{
    return this.firestore.collection<opportunity>('oppoptunities',ref=>ref.where('userid',"==",userid)).valueChanges();
   }
   getAllOpportunities(): Observable<opportunity[]>{

    return this.opportunitiesCollection.valueChanges({"idField":'userid'});
}
}
