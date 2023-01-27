import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { personNotifications } from '../../inteerfaces/person-notification';

@Injectable({
  providedIn: 'root',
})
export class PersonnotificationService {
  private notificationCollection: AngularFirestoreCollection<personNotifications>;
  constructor(private firestore: AngularFirestore) {
    this.notificationCollection =
      this.firestore.collection<personNotifications>('personnotifications');
  }

  addNotification(notification: personNotifications) {
    return this.notificationCollection.add(notification);
  }
  getNotification(userid: string) {
    return this.firestore
      .collection('personnotifications', (ref) =>
        ref.where('uid', '==', userid).orderBy('notiDate', 'desc')
      )
      .valueChanges({ idField: 'id' });
  }
}
