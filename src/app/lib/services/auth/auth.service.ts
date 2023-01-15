import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, range, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signOut } from "firebase/auth";
import { organization } from '../../inteerfaces/organization';
import { drange, person } from '../../inteerfaces/person';
import { courses } from '../../inteerfaces/person';
import { cities } from '../../inteerfaces/cities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth:AngularFireAuth,private firestore: AngularFirestore , private router: Router) { }
  userState$
  
   = this.fireAuth.authState.pipe(
    switchMap((value)=>{
if(!value)
return of(null);
else
return this.firestore.collection<any>('users').doc(value.uid).valueChanges();
    })

    
  )


  signIn(email:string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  signUpPerson(email: string, password: string, 
    fullName:string,phoneNumber:number,city:string,days:string,experience:string,
<<<<<<< HEAD
    courses:courses[],skills:any,daterange:drange,role:string, profileImg:string){
=======
    courses:courses[],skills:string[],daterange:drange,role:string, profileImg:string){
>>>>>>> 79236132446034c752f2538a4f8b4116c8f7d0b2
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((val)=>{
    let user:person={
id:val.user?.uid,
fullName:fullName,
phoneNumber:phoneNumber,
city:city,
skills:skills,
experience:experience,
courses:courses,
days:days,
range:daterange,
role:role,
profileImg:profileImg,

    };
    this.firestore.collection<any>('users').doc(val.user?.uid).set(user);
      } ,

    );
  }

  signUpCompany(email: string, password: string,
    name:string,phoneNumber:number,city:string,logo:string,
    type:string,url:string,role:string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((val)=>{
    let user:organization={
id:val.user?.uid,
name:name,
phoneNumber:phoneNumber,
city:city,
url:url,
profileImg:logo,
type:type,
email:email,
role:role,

    };
    this.firestore.collection<any>('users').doc(val.user?.uid).set(user);
      } ,

    );
  }

  signout(){
    const auth = getAuth();

  signOut(auth).then(() => {
    // Sign-out successful.
    this.router.navigate(['/']);
  }).catch((error) => {
    alert(error);
  });
}
}