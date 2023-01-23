import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { collection, collectionChanges, query } from '@angular/fire/firestore';
import { Query, where } from '@firebase/firestore';
import * as firebase from 'firebase/compat';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { apply, MyEnum } from '../../inteerfaces/apply';
import { opportunity, range } from '../../inteerfaces/opportunity';
@Injectable({
  providedIn: 'root',
})
export class OportunitiesService {
  private opportunitiesCollection: AngularFirestoreCollection<opportunity>;
  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    this.opportunitiesCollection =
      this.firestore.collection<opportunity>('oportunities');
  }

  addOpportunity(opportunity: opportunity) {
    let addedOpportunity = this.opportunitiesCollection.add(opportunity);
    return from(addedOpportunity);
  }

  getOpportunities(userid: string) {
    return this.firestore
      .collection<opportunity>('oportunities', (ref) =>
        ref.where('userid', '==', userid)
      )
      .valueChanges();
  }
 


  getAllOpportunities() {
    return this.firestore
      .collection<opportunity>('oportunities')
      .valueChanges();
  }


  
  getoportunityById(id: string): Observable<opportunity | undefined> {
    return this.opportunitiesCollection.doc(id).valueChanges();
  }

  addApplicant(activityid: string, obj: apply) {
    return this.firestore
      .collection<apply>('oportunities/' + activityid + '/applicants')
      .add(obj);
  }
  getApplicantsByState(activityid: string, filterstate: MyEnum) {
    return this.firestore
      .collection<apply>('oportunities/' + activityid + '/applicants', (ref) =>
        ref.where('state', '==', filterstate)
      )
      .valueChanges();
  }
  getNotifications(activityid: string, filterstate: MyEnum,userid:string) {
    return this.firestore
      .collection<apply>('oportunities/' + activityid + '/applicants', (ref) =>
        ref.where('state', 'in', [MyEnum.approve,MyEnum.reject]).where('uid', '==', userid)
      )
      .valueChanges();
  }
  getcompanynotifications(activityid: string, filterstate: MyEnum){
    return this.firestore
    .collection<apply>('oportunities/' + activityid + '/applicants', (ref) =>
      ref.where('state', '==','waitting')
    )
    .valueChanges();
}
  updateCompanyInfo(
    activityid: string,
    companyName: string,
    companyLogo: string,
    companyType: string
  ) {
    console.log(activityid,companyLogo,companyName,companyType);
    return from(
      this.opportunitiesCollection
        .doc<opportunity>(activityid)
        .update({
          companyName: companyName,
          companyLogo:companyLogo,
          companyType: companyType,
        })
    );
  }


  updatecount(
    activityid: string,
    numberOfApplicants: number,
    applicantsIds: string[],
    active: boolean
  ) {
    return from(
      this.opportunitiesCollection
        .doc<opportunity>(activityid)
        .update({
          numberOfApplicants: numberOfApplicants,
          applicantsIds,
          active: active,
        })
    );
  }
  updateState(userid: string, state: MyEnum, activityid: string) {
    return from(
      this.firestore
        .collection<apply>('oportunities/' + activityid + '/applicants')
        .doc(userid)
        .update({ state: state })
    );
  }
  getAppliedOpportunities(
    userid: string,
    activityid: string
  ): Observable<apply | any> {
    return this.firestore
      .collection('oportunities/' + activityid + '/applicants', (ref) =>
        ref.where('oportunityId', '==', activityid)
      )
      .valueChanges();
  }
  getvolunteer(userid: string, activityid: string): Observable<apply | any> {
    return this.firestore
      .collection('oportunities/' + activityid + '/applicants', (ref) =>
        ref.where('uid', '==', userid)
      )
      .valueChanges({ idField: 'id' });
  }
  getUserOpportunities(userid: string){
    return this.firestore
      .collection<opportunity>('oportunities', (ref) =>
        ref.where('applicantsIds', 'array-contains', userid)
      )
      .valueChanges({ idField: 'id' });
  }

  updatid(id: string) {
    return from(
      this.opportunitiesCollection.doc<opportunity>(id).update({ id: id })
    );
  }
  // updateApplicant(id: string) {
  //   return from(
  //     this.opportunitiesCollection.doc<opportunity>(id).update({ id: id })
  //   );
  // }

  getfilteredopportunities(
    skills?: string[] | any,
    name?: string | null,
    type?: string | null,
    range?: any
  ) {
   console.log(name, type, skills,range);
       return this.firestore
      .collection<opportunity>('oportunities')
     
      .valueChanges({ idField: 'id' }).pipe(
        map((data)=> {
          return data.filter((val)=>{
              let condition = true;
              if(name != null && name !=""){
             console.log("name");
                condition  =  val.companyName?.startsWith(name) ?? false;
              }
              if(skills != null && skills.length > 0){
                // console.log(val.skills);
                console.log("skills");

                condition  =  skills?.every((skill: string)=> val.skills.indexOf(skill)!= -1  ) ?? false;
                //for every skill in the array it will check if object .skills has it
              }
              if(type != null && type != ""){
                console.log("type");

                condition  =  val.companyType == type ?? false;
              }
              if(range.start != '' && range.end != ''){
                console.log("range");
             condition  =  ( val.range.start.toDate()<=range.end  && val.range.end.toDate() >=range.start)?? false;
              }
            //  console.log(condition);
              return condition;
          });
        })
      );

  }     

}
