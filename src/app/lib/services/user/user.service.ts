import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usercollection!: AngularFirestoreCollection<any>;
  constructor(private firestore: AngularFirestore) {
    this.usercollection = this.firestore.collection('users');
  }

  deleteuser(id: string) {
    return from(this.usercollection.doc(id).delete());
  }
  updateuser(id: string, user: any) {
    return this.firestore
      .collection('users')
      .doc(id)
      .update({ ...user });
  }
  updateNumberOfOppo(id: string, numberof: number) {
    return this.firestore
      .collection('users')
      .doc(id)
      .update({ numberOfApps: numberof });
  }
  getuserById(id: string): Observable<any> {
    return this.usercollection.doc(id).valueChanges({ idField: 'id' });
  }
  getAllusersByRole(role: string): Observable<any[]> {
    if(role=="company")
    return this.firestore
    .collection<any>('users', (ref) => ref.where('role', '==', role).orderBy('numberOfApps', 'desc')
    )
    .valueChanges({ idField: 'id' });
    else
    return this.firestore
      .collection<any>('users', (ref) => ref.where('role', '==', role))
      .valueChanges({ idField: 'id' });
  }
getTopCompanies(){
  return this.firestore
  .collection<any>('users', (ref) =>
    ref
      .where('role', '==', 'company')
      .orderBy('numberOfApps', 'desc')
      .limit(6)
  )
  .valueChanges({ idField: 'id' });

}
  getfilteredusers(role: string, name: string, type: string) {
    return this.firestore
      .collection<any>('users', (ref) => {
        if (type !='' && name !='') {
          return ref
            .where('role', '==', role)
            .where('name', '==', name).where('type', '==', type);
        
        } else if (name != '') {
          return ref
            .where('role', '==', role)
            .where('name', '==', name)
        } else {
          if (type != '') {
            return ref
              .where('role', '==', role).where('type', '==', type);
          }
          else {
            return ref.where('role', '==', role);
          }
        }
      })
      .valueChanges({ idField: 'id' });
  }

  getfilteredvolunteers(skills: string[] | any, city: string) {
    console.log(skills,city);

    return this.firestore
      .collection<any>('users', (ref) => {
        if (skills.length > 0 && city != '') {
          return ref
            .where('role', '==', 'person')
            .where('skills', "array-contains-any", skills)
             .where('city', '==', city);
            
        } else if (skills.length > 0) {
          return ref
            .where('role', '==', 'person')
            .where('skills', "array-contains-any", skills)
        } else if (city != '') {
          return ref.where('role', '==', 'person').where('city', '==', city);
        } else {
          return ref.where('role', '==', 'person');
        }
      })
      .valueChanges({ idField: 'id' });
  }
}
