import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

hide: boolean=true;
  form = new FormGroup({
email:new FormControl('',[Validators.required, Validators.email]),
password:new FormControl('',[Validators.required]),
  })

submit(){
  console.log({...this.form.value});
}

}





