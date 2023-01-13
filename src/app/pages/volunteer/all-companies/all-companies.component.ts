import { Component } from '@angular/core';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';
import { map, Observable } from 'rxjs';
import { companytypes } from 'src/assets/arrays/company-types';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/lib/services/user/user.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent {
  allcompanies!:organization[];
  allcompaniescopy!:Observable<organization[] | undefined>;


  constructor(private auth:AuthService,private organizationservice:OrganizationService,private userservice:UserService){}
  types=companytypes;
  ngOnInit(): void {
this.userservice.getAllusersByRole('company').subscribe((val)=>{
  this.allcompanies = val;

})
 


  }
form=new FormGroup({
  type: new FormControl(''),
  name: new FormControl('')


})
get name(){
  return this.form.get('name')?.value;
}
get type(){
  return this.form.get('type')?.value;
}
  // filterontype(){
  //   // this.allcompanies=this.allcompaniescopy.pipe(map(companies => companies!.filter(item => item.type==this.form.get('type')?.value)))
   
  // }
  // filteronname(){
  //   // this.allcompanies=this.allcompaniescopy.pipe(map(companies => companies!.filter(item => (item.name).startsWith( this.form.get('name')?.value+''))))

  // }
  filter(){
    console.log(this.name+'',this.type+'')
    this.userservice.getfilteredusers('company',this.name?.toLocaleLowerCase()+'',this.type+'').subscribe((val)=>{
      console.log(val);
      this.allcompanies = val;
    
    })
  }
}