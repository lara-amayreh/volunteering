import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth:AngularFireAuth,private firestore: AngularFirestore , private router: Router) { }
  userState$ = this.fireAuth.authState;



  signIn(email:string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  signUp(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
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
  // public currentUser: any;
  // public userStatus!: string;
  // public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);
  

  // setUserStatus(userStatus: any): void {
  //   this.userStatus = userStatus;
  //   this.userStatusChanges.next(userStatus);
  // }

//   signIn(email: string, password: string) {
      
//     this.angularfireauth.signInWithEmailAndPassword(email, password)
//     .then((user)=>{
//       this.firestore.collection("users").ref.where("username", "==", user.user?.email).onSnapshot(snap =>{
//         snap.forEach(userRef => {
//           console.log("userRef", userRef.data());
//           this.currentUser = userRef.data();
//           //setUserStatus
//           this.setUserStatus(this.currentUser)
//           if(userRef.get('role') == "volunteer") {
//             this.router.navigate(["volunteer/"]);
//           }else{
//             this.router.navigate(["company"]);
//           }
//         })
//       })
     
//     }).catch(err => err)
// }
  //  signIn(email:string, password: string){


  //  return this.angularfireauth.signInWithEmailAndPassword(email, password);
  // }
  // // signUp(email: string, password: string){
  // //   return this.angularfireauth.createUserWithEmailAndPassword(email, password);
  // // }
  // async signUp(email:string, password:string,role:string){
  
    
  //   try {
  //     const userResponse = await this.angularfireauth.createUserWithEmailAndPassword(email, password);
  //     // add the user to the "users" database
  //     let user = {
  //       id: userResponse.user?.uid,
  //       username: userResponse.user?.email,
  //       role: role,
        
  //     };

      //add the user to the database
    //   this.firestore.collection("users").add(user)
    //     .then(user_1 => {
    //       user_1.get().then(x => {
    //         //return the user data
    //         console.log(x.data());
    //         this.currentUser = x.data();
    //         this.setUserStatus(this.currentUser);
    //         this.router.navigate(["/"]);
    //       });
    //     }).catch((err: any) => {
    //       console.log(err);
    //     });
    // } catch (err_1) {
    //   console.log("An error ocurred: ", err_1);
    // }
 
    // }

  
 

 
}