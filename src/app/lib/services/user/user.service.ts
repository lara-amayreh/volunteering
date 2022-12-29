import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import {users} from '../../inteerfaces/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usercollection! : AngularFirestoreCollection<users>;
  constructor(private firestore :AngularFirestore) {
this.usercollection = this.firestore.collection('users');


   }
   adduser(user:users){
let addeduser = this.usercollection.add(user);console.log(addeduser);
return from(addeduser);
   }
   getuser(userid:string):Observable<any[]>{
    return this.firestore.collection<any>('users',ref=>ref.where('uid',"==",userid)).valueChanges();
   }

  
}
