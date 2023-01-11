import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
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
   organization!: organization;
   public id:string='';
   role!:string;
   userid!:string;
   organization$!: Observable <organization | undefined>;

  constructor(public dialog: MatDialog, private route:ActivatedRoute, private orgservice:OrganizationService, public userservice:UserService,public authservice:AuthService) 
  { 

    this.organization$ = this.route.paramMap.pipe(
      switchMap((value)=> {
        this.id = value.get('id')+'';
        console.log(this.id);
       
        return this.userservice.getuserById(this.id);
  
  
      
      }  )
      )}
      
      ngOnInit(): void {
  
        this.authservice.userState$.subscribe((value)=>{
         if(value){
         this.role = value.role;
         this.userid =value.id 
         console.log(this.userid);
        }
     })
        
        
       }
  
    
  
    
  
geturl(){
 
	let x= `url("${this.organization.profileImg}")` ;
  return x;
}
  updateorganization(id:string){
   console.log(id);
    let dialogRef = this.dialog.open(UpdateCompanyComponent, {
       width: '500px',
      data:{id:id,data:this.organization}
     });
     dialogRef.afterClosed().subscribe((result)=> {
         console.log(result); 
 
         //refresh table 
        
        
     })
 
    
   }
}
