import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, switchMap } from 'rxjs';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { UpdateCompanyComponent } from '../update-company/update-company.component';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent {
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
   organization: organization[]=[];
   id:string='';

  constructor(public dialog: MatDialog,public userservice:UserService,private authservice:AuthService) { }
  ngOnInit(): void {
  
  this.authservice.userState$
  .pipe(switchMap( (value) => {
  if(value){
 
    return this.userservice.getuser(value?.uid);

    }
    else
    return of(null);
   
  })).subscribe((response)=>{
    if(response){
 console.log(response);
 this.id =response[0].uid!}
  })
  
  
  }

  updateorganization(id:string){
    // console.log(id);
    let dialogRef = this.dialog.open(UpdateCompanyComponent, {
       width: '500px',
      data:{id:id}
     });
     dialogRef.afterClosed().subscribe((result)=> {
         console.log(result); 
 
         //refresh table 
        //  this.organization = this.userservice.getuser();
        
        
     })
 
    
   }
}
