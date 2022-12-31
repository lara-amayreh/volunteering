import { Component, Inject } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, map, Observable, of, switchMap } from 'rxjs';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { companytypes } from 'src/assets/arrays/company-types';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent {
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadProgress!: Observable<number|any>;
  uploadState!: Observable<string |any>;
logo!:string;
  downloadURL!: string |any;

  role: string="company";
   organization! :organization;
  constructor( private afStorage :AngularFireStorage, private userservice:UserService ,private authservice:AuthService,
    private dialogRef: MatDialogRef<UpdateCompanyComponent>,
    @Inject(MAT_DIALOG_DATA)
     private data: organization)
     {}
     types=companytypes;
     hide: boolean=true;
     form = new FormGroup({
       name:new FormControl('',[Validators.required]),
       phoneNumber:new FormControl<number |null>(null,[Validators.required,Validators.min(0)]),
       logo:new FormControl('',[Validators.required ]),
       url:new FormControl('',[Validators.required,Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')]),
       email:new FormControl('',[Validators.required, Validators.email]),
       password:new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
       type: new FormControl('',[Validators.required]),
       
     
         
     })
     submit(){
    
    this.authservice.userState$
    .pipe(switchMap( (value) => {
       console.log(value);
      if(value){
    return this.userservice.updateuser(value.uid,{...this.form.value }as organization);
    
      }
    
    
      
      else{
      return of (null);}
    })).subscribe((value)=>{
      if(!value)
      alert("connot update your profile");
    })
    
    this.dialogRef.close(true);
    
    }



    upload = (event:any) => {
      // create a random id
      const randomId = Math.random().toString(36).substring(2);
      // create a reference to the storage bucket location
      this.ref = this.afStorage.ref('/images/' + randomId);
      // the put method creates an AngularFireUploadTask
      // and kicks off the upload
      this.task = this.ref.put(event.target.files[0]);
      this.uploadState = this.task.snapshotChanges().pipe(map(s => s!.state));
      
      // AngularFireUploadTask provides observable
      // to get uploadProgress value
      // this.uploadProgress = this.task.snapshotChanges()
      // .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
      
      // observe upload progress
      this.uploadProgress = this.task.percentageChanges();
      // get notified when the download URL is available
      this.task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = this.ref.getDownloadURL())
      )
      .subscribe();
    }
    
    }
