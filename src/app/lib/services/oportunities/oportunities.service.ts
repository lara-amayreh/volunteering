import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { collection, collectionChanges } from '@angular/fire/firestore';
import { where } from '@firebase/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { opportunity } from '../../inteerfaces/opportunity';
@Injectable({
  providedIn: 'root'
})
export class OportunitiesService {
private opportunitiesCollection! : AngularFirestoreCollection<opportunity>;
  constructor(private firestore :AngularFirestore, private fireAuth:AngularFireAuth) {
          this.opportunitiesCollection = this.firestore.collection("oportunities");
}


    userState$ = this.fireAuth.authState.pipe(
      switchMap((value)=>{
  if(!value)
  return of(null);
  else//return user opportunities
  return this.firestore.collection<opportunity>('oportunities').doc(value.uid).valueChanges({ "idField": 'id'})
      })
  
      
    )
  

   
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
updatid(id: string){
  return from(this.opportunitiesCollection.doc<opportunity>(id).update({id: id}));
}
updatcompany(id: string,name:string,logo:string){
  return from(this.firestore.collection<opportunity>('oportunities',ref=>ref.where('userid',"==",id)).doc().update({companyName: name, logo:logo}));
}
}
