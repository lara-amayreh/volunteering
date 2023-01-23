import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable} from 'rxjs';
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
  getuserById(id: string): Observable<any> {

    return this.usercollection.doc(id).valueChanges({ idField: 'id' });
  }
  getAllusersByRole(role: string): Observable<any[]> {
    return this.firestore
      .collection<any>('users', (ref) => ref.where('role', '==', role))
      .valueChanges({ idField: 'id' });
  }

  getfilteredusers(role: string, name: string, type: string) {
    return this.firestore
      .collection<any>('users', (ref) => {
        if (type == 'All Types' && name != '') {
          return ref
            .where('role', '==', role)
            .where('name'.toLowerCase(), '==', name);
        } else if (type == 'All Types') {
          return ref.where('role', '==', role);
        } else if (name != '' && type != '') {
          return ref
            .where('role', '==', role)
            .where('name'.toLowerCase(), '==', name + '')
            .where('type', '==', type + '');
        } else {
          if (name != '' && type == '') {
            return ref
              .where('role', '==', role)
              .where('name'.toLowerCase(), '==', name);
          } else if (name == '' && type != '') {
            return ref.where('role', '==', role).where('type', '==', type);
          } else {
            return ref.where('role', '==', role);
          }
        }
      })
      .valueChanges({ idField: 'id' });
  }

  getfilteredvolunteers(skills: string[] | any, city: string) {
    return this.firestore
      .collection<any>('users', (ref) => {
        if (skills.length > 0 && city == '') {
          return ref
            .where('role', '==', 'person')
            .where('skills', 'array-contains-any', skills);
        } else if (skills.length > 0 && city != '') {
          return ref
            .where('role', '==', 'person')
            .where('skills', 'array-contains-any', skills)
            .where('city', '==', city);
        } else if (skills.length == 0 && city != '') {
          return ref.where('role', '==', 'person').where('city', '==', city);
        } else {
          return ref.where('role', '==', 'person');
        }
      })
      .valueChanges({ idField: 'id' });
  }
}
