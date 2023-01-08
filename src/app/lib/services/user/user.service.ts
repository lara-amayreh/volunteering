import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { organization } from '../../inteerfaces/organization';
import { person } from '../../inteerfaces/person';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usercollection! : AngularFirestoreCollection<any>;
  constructor(private firestore :AngularFirestore) {
this.usercollection = this.firestore.collection('users');


   }

   getuser(userid:string):Observable<any>{
return this.usercollection.doc(userid).valueChanges();   }

   deleteuser(id: string){
    return from(this.usercollection.doc(id).delete());
  }
  updateuser(id: string, user: any){
    return this.firestore.collection('users').doc(id).update({...user});
  }
  getuserById(id : string):Observable<any>{
    console.log(this.usercollection.doc(id).valueChanges());

    return this.usercollection.doc(id).valueChanges();
 }
 getAllusersByRole(role:string):Observable<any[]>{
    
  return this.firestore.collection<any>('users',ref=>ref.where('role',"==",role)).valueChanges({ "idField": 'id' });
 }
  
}
