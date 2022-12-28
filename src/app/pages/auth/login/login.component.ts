import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
constructor( private auth: AuthService, public router:Router, public organizationservise:OrganizationService){}
hide: boolean=true;
  form = new FormGroup({
email:new FormControl('',[Validators.required, Validators.email]),
password:new FormControl('',[Validators.required]),
  })


  submit(){
    this.auth.signIn(
      this.form.get('email')?.value+'',
      this.form.get('password')?.value+''
      ).then((user)=> {
        //navigate to admin/
        // this.router.navigate(['admin/']);

        console.log(user);
      }).catch((error)=> {
        console.log(error)
      });
    }

}







