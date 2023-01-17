import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { observable, Observable, of, switchMap } from 'rxjs';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';
import { UserService } from 'src/app/lib/services/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  organizations$ !:Observable<organization[]>;
  // res: organization[];
constructor( private auth: AuthService,private userservice:UserService, public router:Router, public organizationservise:OrganizationService){}
hide: boolean=true;
role:string='';
  form = new FormGroup({
email:new FormControl('',[Validators.required, Validators.email]),
password:new FormControl('',[Validators.required]),
  })

  
   
      
      
  ngOnInit(): void {
    this.auth.userState$.subscribe((value)=>{
      if(value){
      this.role = value.role;
    }
    })
    
        }
  
  submit(){
    
    this.auth.signIn(
      this.form.get('email')?.value+'',
      this.form.get('password')?.value+''
      ).then((user)=> {
       if(this.role.includes("company"))
this.router.navigate(['company/']);
else
if(this.role.includes("person"))

this.router.navigate(['volunteer/']);



      }).catch((error)=> {
      });
    }

}







