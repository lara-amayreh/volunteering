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
import { StorageService } from 'src/app/lib/services/storage/storage.service';
import { passwordMatchingValidator } from 'src/app/lib/validators/passwordmatching';

@Component({
  selector: 'app-organaization-regester',
  templateUrl: './organaization-regester.component.html',
  styleUrls: ['./organaization-regester.component.css']
})
export class OrganaizationRegesterComponent implements OnInit {
 
logo!:string;


  role: string="company";
   organization! :organization;
  downloadurl:string='../../../../../assets/images/company.png';
  constructor( private afStorage: AngularFireStorage , public auth:AuthService , private router:Router , private storge:StorageService){}
  // organizations$ !:Observable<organization[]>;
types=companytypes;
hide: boolean=true;
form = new FormGroup({
  name:new FormControl('',[Validators.required]),
  phoneNumber:new FormControl<number |null>(null,[Validators.required,Validators.min(0)]),
  profileImg:new FormControl(''),
  url:new FormControl('',[Validators.required,Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')]),
  email:new FormControl('',[Validators.required, Validators.email]),
  password:new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
  confirmPassword:new FormControl('',[Validators.required]),
  type: new FormControl('',[Validators.required]),



},{validators: [passwordMatchingValidator]});
ngOnInit(): void {
  // this.organizations$= this.organizationservice.getAllOrganizations();
}
submit(){
   //register user in firebase
this.role = "company";

  //  this.organization =this.form.value;
  //  this.organization.role=this.role;
   this.auth.signUpCompany(
    this.form.get('email')?.value+ '',
    this.form.get('password')?.value+'',
    this.form.get('name')?.value+ '',
    this.form.get('phoneNumber')?.value as number,
    this.form.get('city')?.value+ '',
     this.downloadurl,
    this.form.get('type')?.value+'',
    this.form.get('url')?.value+ '',
    this.role,
  ).then((user)=> {


// this.organization.logo= this.downloadURL;
// console.log(this.organization.logo);


    //save other form fields collection
    this.router.navigate(['company/']);

    console.log(user);
  }).catch((error)=> {
    console.log(error)
  });
}
upload(event:Event){
  console.log(event);
  let file = (event.target as HTMLInputElement)?.files?.[0];
  if(file)
  {this.storge.uploadimg(file).subscribe((value)=>{
    this.downloadurl=value;
  })}
}
geturl(){
 
	let x= `url("${this.downloadurl}")` ;
  return x;
}
}