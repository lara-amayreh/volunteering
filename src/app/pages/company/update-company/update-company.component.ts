import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, map, observable, Observable, of, switchMap } from 'rxjs';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { person } from 'src/app/lib/inteerfaces/person';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';
import { StorageService } from 'src/app/lib/services/storage/storage.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { companytypes } from 'src/assets/arrays/company-types';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit{
 

  downloadurl!: string;
orga$!:Observable<any>;
  role: string="company";
   organization! :organization;
  constructor(private storage:StorageService, private userservice:UserService, private afStorage :AngularFireStorage, private organizationservice:OrganizationService ,private authservice:AuthService,
    private dialogRef: MatDialogRef<UpdateCompanyComponent>, public firestore:AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, company:any})
     {}

  ngOnInit(): void {
   
this.authservice.userState$.subscribe((value)=>{
  this.form.get('name')?.setValue(value.name);
  this.form.get('phoneNumber')?.setValue(value.phoneNumber);
  this.form.get('email')?.setValue(value.email);
  this.form.get('type')?.setValue(value.type);
  this.form.get('url')?.setValue(value.url);
  this.role=value.role;
  this.downloadurl=value.profileImg;
  this.form.get('about')?.setValue(value.about);
  this.form.get('adress')?.setValue(value.city)+'';








}
)
  }
     types=companytypes;
     hide: boolean=true;
     form = new FormGroup({
       name:new FormControl('',[Validators.required]),
       phoneNumber:new FormControl<number |null>(null,[Validators.required,Validators.min(0)]),
       profileImg:new FormControl(''),
       url:new FormControl('',[Validators.required,Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')]),
       email:new FormControl('',[Validators.required, Validators.email]),
       type: new FormControl('',[Validators.required]),
       about:new FormControl(''),
       adress:new FormControl(''),


       
     
         
     })
   
     submit(){

      this.userservice.updateuser(this.data.id,
        {
          name:this.form.get('name')?.value+ '',
          phoneNumber: this.form.get('phoneNumber')?.value as number,
          city:this.form.get('adress')?.value+ '',
           profileImg:this.downloadurl,
          type:this.form.get('type')?.value+'',
          url:this.form.get('url')?.value+ '',
          about:this.form.get('about')?.value+ '',


        } );
        


  //  this.firestore.collection<opportunity>('oportunities').doc(this.data.id).update(this.form.value as organization);

    
       
    this.dialogRef.close(true);
    
    }


    upload(event:Event){
      let file = (event.target as HTMLInputElement)?.files?.[0];
      if(file)
      {this.storage.uploadimg(file).subscribe((value)=>{
        this.downloadurl=value;
      })}
    }
  }