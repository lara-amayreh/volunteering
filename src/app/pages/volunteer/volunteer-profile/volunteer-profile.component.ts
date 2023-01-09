import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { person } from 'src/app/lib/inteerfaces/person';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OrganizationService } from 'src/app/lib/services/organization/organization.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { UpdateVolunteerComponent } from '../update-volunteer/update-volunteer.component';

@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.css']
})
export class VolunteerProfileComponent {
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
   person!: person;
   public id:string='';

  constructor(public dialog: MatDialog, private orgservice:OrganizationService, public userservice:UserService,public authservice:AuthService) { }

  ngOnInit(): void {
  
    this.authservice.userState$.subscribe((value)=>{
      console.log(value);
      if(value)
      this.id = value.id+'';
      this.person= value as person;
    })
    
    
    }
  
    updateprofile(id:string){
     console.log(id);
      let dialogRef = this.dialog.open(UpdateVolunteerComponent, {
         width: '1000px',
         height:'400px',
        data:{id:id,data:this.person}
       });
       dialogRef.afterClosed().subscribe((result)=> {
           console.log(result); 
          // this.person = result;
   
          
          
       })
   
      
     }
  }
  

