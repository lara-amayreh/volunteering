import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { companytypes } from 'src/assets/arrays/company-types';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { Router } from '@angular/router';
import { async, finalize, map, Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { UserService } from 'src/app/lib/services/user/user.service';

@Component({
  selector: 'app-organaization-regester',
  templateUrl: './organaization-regester.component.html',
  styleUrls: ['./organaization-regester.component.css']
})
export class OrganaizationRegesterComponent implements OnInit {
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadProgress!: Observable<number|any>;
  uploadState!: Observable<string |any>;
logo!:string;
  downloadURL!: string |any;

  role: string="company";
   organization! :organization;
  constructor( private afStorage: AngularFireStorage ,private userservice:UserService , private auth:AuthService , private router:Router){}
  // organizations$ !:Observable<organization[]>;
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
ngOnInit(): void {
  // this.organizations$= this.organizationservice.getAllOrganizations();
}
submit(){
   //register user in firebase

   this.role="company";
  
  //  this.organization =this.form.value;
  //  this.organization.role=this.role;
   this.auth.signUp(
    this.form.get('email')?.value+ '',
    this.form.get('password')?.value+'',
    // this.role
  ).then((user)=> {
this.organization = {...this.form.value} as organization;
console.log(this.organization);
this.organization.role=this.role;
this.organization.uid=user.user?.uid;

// this.organization.logo= this.downloadURL;
// console.log(this.organization.logo);


    //save other form fields collection 
this.userservice.adduser({...this.organization} as organization);

    this.router.navigate(['company/']);

    console.log(user);
  }).catch((error)=> {
    console.log(error)   
  });
}

// function to upload file
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