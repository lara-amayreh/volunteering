import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { companytypes } from 'src/assets/arrays/company-types';
import { OrganizationService } from 'src/app/lib/services/auth/organization.service';

@Component({
  selector: 'app-organaization-regester',
  templateUrl: './organaization-regester.component.html',
  styleUrls: ['./organaization-regester.component.css']
})
export class OrganaizationRegesterComponent implements OnInit {
  constructor(private organizationservice:OrganizationService){}
  organizations:organization[]=[];
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
  this.organizations= this.organizationservice.getOrganization();
}
submit(){
  this.organizationservice.addOrganization({...this.form.value}as organization);
  console.log({...this.form.value} as organization);
  
}
}
