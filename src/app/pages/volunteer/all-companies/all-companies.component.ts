import { Component } from '@angular/core';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';
import { map, Observable } from 'rxjs';
import { companytypes } from 'src/assets/arrays/company-types';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent {
  allcompanies!:Observable<organization[] | undefined>;
  allcompaniescopy!:Observable<organization[] | undefined>;


  constructor(private auth:AuthService,private organizationservice:OrganizationService){}
  types=companytypes;
  ngOnInit(): void {
 this.allcompanies= this.organizationservice.getAllOrganizations();
 this.allcompaniescopy =this.allcompanies;
 


  }
form=new FormGroup({
  type: new FormControl(''),
  name: new FormControl('')


})
  filterontype(){
    this.allcompanies=this.allcompaniescopy.pipe(map(companies => companies!.filter(item => item.type==this.form.get('type')?.value)))
   
  }
  filteronname(){
    this.allcompanies=this.allcompaniescopy.pipe(map(companies => companies!.filter(item => (item.name).startsWith( this.form.get('name')?.value+''))))

  }
}