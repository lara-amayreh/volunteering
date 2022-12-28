import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { companytypes } from 'src/assets/arrays/company-types';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organaization-regester',
  templateUrl: './organaization-regester.component.html',
  styleUrls: ['./organaization-regester.component.css']
})
export class OrganaizationRegesterComponent implements OnInit {
  role: string="company";
  organization! :organization;
  constructor(private organizationservice:OrganizationService , private auth:AuthService , private router:Router){}
  organizations$ !:Observable<organization[]>;
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
  this.organizations$= this.organizationservice.getStudents();
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
    //save other form fields collection 
this.organizationservice.addStudent({...this.organization});

    this.router.navigate(['company/']);

    console.log(user);
  }).catch((error)=> {
    console.log(error)   
  });
}
}
