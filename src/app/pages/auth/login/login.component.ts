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
loged!:any;
  form = new FormGroup({
email:new FormControl('',[Validators.required, Validators.email]),
password:new FormControl('',[Validators.required]),
  })

  
    ngOnInit(): void {
  
      this.auth.userState$
      .pipe(switchMap( (value) => {
      if(value){
     console.log(value);
     console.log(value.uid);

        return this.userservice.getuser(value?.uid);
    
       
      }
        else
        return of(null);
       
      })).subscribe((response)=>{
        if(response)
     this.loged=response;
     console.log(this.loged[0].role);
     
      })
      
      
      }
  
  submit(){
    
    this.auth.signIn(
      this.form.get('email')?.value+'',
      this.form.get('password')?.value+''
      ).then((user)=> {
        //navigate to admin/
      if(this.loged[0].role=="volunteer")        
         this.router.navigate(['volunteer/']);
         else
         this.router.navigate(['company/']);

      }).catch((error)=> {
        console.log(error)
      });
    }

}







