import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { collection, collectionChanges } from '@angular/fire/firestore';
import { where } from '@firebase/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { apply, MyEnum } from '../../inteerfaces/apply';
import { opportunity } from '../../inteerfaces/opportunity';
@Injectable({
  providedIn: 'root'
})
export class OportunitiesService {
private opportunitiesCollection : AngularFirestoreCollection<opportunity>;
  constructor(private firestore :AngularFirestore, private fireAuth:AngularFireAuth) {
          this.opportunitiesCollection = this.firestore.collection<opportunity>("oportunities");
}
   
  addOpportunity(opportunity:opportunity){
    console.log(opportunity);
let addedOpportunity = this.opportunitiesCollection.add(opportunity);console.log(addedOpportunity);
return from(addedOpportunity);
   }

   getOpportunities(userid:string){
    return this.firestore.collection<opportunity>('oportunities',ref=>ref.where('userid',"==",userid)).valueChanges({"idField":'id'});
   }
   getAllOpportunities(): Observable<opportunity[]>{

    return this.firestore.collection<opportunity>('oportunities').valueChanges({ "idField": 'id'});
}
getoportunityById(id : string):Observable<opportunity | undefined>{

  return this.opportunitiesCollection.doc(id).valueChanges();
}

addApplicant(activityid:string, obj:apply) {
  return this.firestore.collection<apply>('oportunities/' + activityid + '/applicants').add(obj);
 }
 getApplicantsByState(activityid:string,filterstate:MyEnum){
 return this.firestore.collection<apply>('oportunities/' + activityid + '/applicants',ref=>ref.where('state',"==",filterstate)).valueChanges();

    
  }
  updatecount(activityid:string, numberOfApplicants:number, applicantsIds: string [], active:boolean){
    // console.log(numberOfApplicants);
    return from(this.opportunitiesCollection.doc<opportunity>(activityid).update({numberOfApplicants: numberOfApplicants , applicantsIds, active:active}));
  }
  updateState(userid:string,state:MyEnum,activityid:string){
    // console.log(numberOfApplicants);
    return from(this.firestore.collection<apply>('oportunities/' + activityid + '/applicants').doc(userid).update({state:state}));
  }
  getAppliedOpportunities(userid:string,activityid:string):Observable<apply | any>{
    return this.firestore.collection('oportunities/' + activityid + '/applicants',ref=>ref.where('oportunityId',"==",activityid)).valueChanges();

  }
  getvolunteer(userid:string,activityid:string):Observable<apply | any>{
    return this.firestore.collection('oportunities/' + activityid + '/applicants',ref=>ref.where('uid',"==",userid)).valueChanges({"idField": "id"});

  }
  getUserOpportunities(userid:string):Observable<opportunity | any>{
        return this.firestore.collection<opportunity>("oportunities", ref=> ref.where('applicantsIds', "array-contains",userid))
        .valueChanges({"idField": "id"});

  }


  
updatid(id: string){
  return from(this.opportunitiesCollection.doc<opportunity>(id).update({id: id}));
}
}
