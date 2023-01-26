import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { orgnotifications } from '../../inteerfaces/org-notifications';

@Injectable({
  providedIn: 'root'
})
export class OrgnotificationService {
  private notificationCollection: AngularFirestoreCollection<orgnotifications>;
  constructor(
    private firestore: AngularFirestore,
    // private fireAuth: AngularFireAuth
  ) {
    this.notificationCollection =
      this.firestore.collection<orgnotifications>('orgnotifications');
  }

addNotification(notification:orgnotifications){
  return this.notificationCollection.add(notification);

}
getNotification(userid:string){
 return this.firestore.collection('orgnotifications',
 (ref)=>ref.where('uid', '==',userid).orderBy('notiDate')
 ).valueChanges({'idField':"id"});
}

}
