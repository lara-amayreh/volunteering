import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { organization } from '../../inteerfaces/organization';
import { person } from '../../inteerfaces/person';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usercollection! : AngularFirestoreCollection<person|organization>;
  constructor(private firestore :AngularFirestore) {
this.usercollection = this.firestore.collection('users');


   }
   adduser(user:organization|person){
let addeduser = this.usercollection.add(user);console.log(addeduser);
return from(addeduser);
   }
   getuser(userid:string):Observable<person[]|organization[]>{
    return this.firestore.collection<any> ('users',ref=>ref.where('uid',"==",userid)).valueChanges();
   }

   deleteuser(id: string){
    return from(this.usercollection.doc(id).delete());
  }
  updateuser(id: string, user: organization|person){
    return this.firestore.collection('users').doc(id).update(user);
  }

  
}
