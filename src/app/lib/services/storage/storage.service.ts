import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
} from '@angular/fire/compat/storage';

import { last, switchMap } from 'rxjs/operators';

export interface FilesUploadMetadata {}
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadimg(file: File) {
    const filepath = `images/${file.name}`;
    const storageref = this.storage.ref(filepath);
    return storageref
      .put(file)
      .snapshotChanges()
      .pipe(
        last(),
        switchMap((value) => {
          return storageref.getDownloadURL();
        })
      );
  }
}
