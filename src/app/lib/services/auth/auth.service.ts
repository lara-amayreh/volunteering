import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signOut } from "firebase/auth";
import { organization } from '../../inteerfaces/organization';
import { person } from '../../inteerfaces/person';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth:AngularFireAuth,private firestore: AngularFirestore , private router: Router) { }
  userState$ = this.fireAuth.authState.pipe(
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
    fullName:string,phoneNumber:number,city:string,skills:string,experience:string,
    courses:string[],days:string,start:string,end:string){
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
start:start,
end:end,
role:"person",

    };
    this.firestore.collection<any>('users').doc(val.user?.uid).set(user);
      } ,

    );
  }

  signUpCompany(email: string, password: string,
    name:string,phoneNumber:number,city:string,logo:string,
    type:string,url:string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((val)=>{
    let user:organization={
id:val.user?.uid,
name:name,
phoneNumber:phoneNumber,
city:city,
url:url,
logo:logo,
type:type,
email:email,
role:"company",

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