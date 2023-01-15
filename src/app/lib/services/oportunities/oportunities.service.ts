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
    console.log(addedOpportunity);
    return from(addedOpportunity);
  }

  getOpportunities(userid: string) {
    return this.firestore
      .collection<opportunity>('oportunities', (ref) =>
        ref.where('userid', '==', userid)
      )
      .valueChanges({ idField: 'id' });
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
  updatecount(
    activityid: string,
    numberOfApplicants: number,
    applicantsIds: string[],
    active: boolean
  ) {
    // console.log(numberOfApplicants);
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
    // console.log(numberOfApplicants);
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
  getUserOpportunities(userid: string): Observable<opportunity | any> {
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

  getfilteredopportunities(
    skills?: string[] | any,
    name?: string | null,
    type?: string | null,
    range?: any
  ) {
    console.log(name, type, skills);
    //   if(skills.length > 0 || name != '' || type != '' || range!= null){
    //     console.log(range.start);
    //     return this.firestore.collection<opportunity>('oportunities',
    //     ref=>{
    //       if(range && skills.length >0 && type != '' && name != ''){
    //         return ref.where('range',">=",range).where('companyType',"==",type)
    //         .where('skills',"array-contains-any",skills).where('companyName',"==",name);
    //       }
    //       else
    //       if(range && skills.length >0 && type != '' && name == ''){
    //         return ref.where('range',">=",range).where('companyType',"==",type)
    //         .where('skills',"array-contains-any",skills);

    //         // return ref.where('skills',"array-contains-any",skills).where('companyType',"==",type);
    //       }

    //       else
    //       if(skills.length == 0 && name == '' && type == '' && range ==null ){
    //         return ref.where('range',">=",range).where('companyType',"==",type)
    //         .where('skills',"array-contains-any",skills);

    //         // return ref.where('skills',"array-contains-any",skills).where('companyType',"==",type);
    //       }

    //      else
    //       if( skills.length == 0 && name != '' && type == '' ){
    //         return ref.where('skills',"array-contains-any",skills).where('companyName',"==",name);
    //       }
    //      else  if(skills.length > 0 && name != ''){
    //       return ref.where('companyName',"==",name).where('skills',"array-contains-any",skills);
    //     }
    //     else
    //     if( skills.length > 0 && name == ''){
    //       return ref.where('skills',"array-contains-any",skills);
    //     }
    //    else  if(skills.length == 0&& name == '' && type != '' ){
    //     return ref.where('companyType',"==",type);
    //   }
    //   else

    //       return ref.where('skills',"array-contains-any",skills).where('companyType',"==",type).where('companyName',"==",name);

    //     }

    //    ).valueChanges({ "idField": 'id' });
    // }

    return this.firestore
      .collection<opportunity>('oportunities')
      // , (ref) => {
      //   let query: any;

      //   if (name != '') {
      //     query = (query ?? ref)
      //       .where('companyName', '>=', name)
      //       .where('companyName', '<=', name + '\uf8ff'); //this to search if text contains it
      //   }
      //   if (skills != '') {
      //     query = (query ?? ref).where('skills', "array-contains-any", skills);
      //   }
      //   if (range != '') {
      //     query = (query ?? ref).where('range.start', ">=", range.start)
      //     .where('range.end', "<=", range.end);
      //   }
      //   if (type != '') {
      //     query = (query ?? ref).where('companyName', '==', name);
      //   }
      //   return (query ?? ref);
      // })
      .valueChanges({ idField: 'id' }).pipe(
        map((data)=> {
          return data.filter((val)=>{
              let condition = true;
              if(name != null && name !=""){
                condition  =  val.companyName?.includes(name) ?? false;
              }
              if(skills != null && skills.length> 0){
                console.log(val.skills);
                condition  =  skills?.every((skill: string)=> val.skills.indexOf(skill)!= -1  ) ?? false;
                //for every skill in the array it will check if object .skills has it
              }
              if(type != null && type != ""){
                condition  =  val.companyType == type ?? false;
              }
              return condition;
          });
        })
      );

    // return this.getAllOpportunities().valueChanges();
  }
}
