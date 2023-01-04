import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { where } from '@firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
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
  return this.firestore.collection<opportunity>('oportunities').doc(value.uid).valueChanges();
      })
  
      
    )
  

   
  addOpportunity(opportunity:opportunity){
    console.log(opportunity);
let addedOpportunity = this.opportunitiesCollection.add(opportunity);console.log(addedOpportunity);
return from(addedOpportunity);
   }

   getOpportunities(userid:string):Observable<opportunity[]>{
    return this.firestore.collection<opportunity>('oportunities',ref=>ref.where('userid',"==",userid)).valueChanges({"idField":'uid'});
   }
   getAllOpportunities(): Observable<opportunity[]>{

    return this.firestore.collection<opportunity>('oportunities').valueChanges();
}
}
