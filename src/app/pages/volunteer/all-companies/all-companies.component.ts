import { Component } from '@angular/core';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent {
  allcompanies:organization[]=[];
  constructor(private auth:AuthService,private organizationservice:OrganizationService){}
  ngOnInit(): void {
 this.organizationservice.getAllOrganizations().subscribe((response)=>{
if(response){
  this.allcompanies=response;
  console.log(this.allcompanies);
}
})
  }
}
