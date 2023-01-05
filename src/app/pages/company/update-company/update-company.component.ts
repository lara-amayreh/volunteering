import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, map, observable, Observable, of, switchMap } from 'rxjs';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { person } from 'src/app/lib/inteerfaces/person';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { companytypes } from 'src/assets/arrays/company-types';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit{
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadProgress!: Observable<number|any>;
  uploadState!: Observable<string |any>;
logo!:string;
  downloadURL!: string |any;
orga$!:Observable<any>;
  role: string="company";
   organization! :organization;
  constructor( private userservice:UserService, private afStorage :AngularFireStorage, private organizationservice:OrganizationService ,private authservice:AuthService,
    private dialogRef: MatDialogRef<UpdateCompanyComponent>, public firestore:AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, company:any})
     {}

  ngOnInit(): void {
   
this.authservice.userState$.subscribe((value)=>{
  console.log(value);
  this.form.get('name')?.setValue(value.name);
  this.form.get('phoneNumber')?.setValue(value.phoneNumber);
  this.form.get('email')?.setValue(value.email);
  this.form.get('type')?.setValue(value.type);
  this.form.get('url')?.setValue(value.url);
  this.form.get('logo')?.setValue(value.downloadURL);
  this.role=value.role;






}
)
  }
     types=companytypes;
     hide: boolean=true;
     form = new FormGroup({
       name:new FormControl('',[Validators.required]),
       phoneNumber:new FormControl<number |null>(null,[Validators.required,Validators.min(0)]),
       logo:new FormControl('',[Validators.required ]),
       url:new FormControl('',[Validators.required,Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')]),
       email:new FormControl('',[Validators.required, Validators.email]),
       type: new FormControl('',[Validators.required]),
       about:new FormControl(''),

       
     
         
     })
   
     submit(){

      this.userservice.updateuser(this.data.id,{... this.form.value} as organization);


  //  this.firestore.collection<organization>('users').doc(this.data.id).update(this.form.value as organization);

    
       
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
      .subscribe((val)=>{
        console.log(val);
      });
    }
    
    }
