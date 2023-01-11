import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
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
   person$!:Observable <person | undefined>;
   public id:string='';
   userid!:string;
role!:string;
  constructor(private route:ActivatedRoute, public dialog: MatDialog, private orgservice:OrganizationService, public userservice:UserService,public authservice:AuthService)
  {this.person$ = this.route.paramMap.pipe(
    switchMap((value)=> {
      this.id = value.get('id')+'';
      console.log(this.id);
      return this.userservice.getuserById(this.id);


    
    }  )
    )}

  ngOnInit(): void {
  
    this.authservice.userState$.subscribe((value)=>{
      console.log(value);
      if(value)
      this.role = value.role;
      this.userid = value.id;
    })
    
    
    }
  
    updateprofile(id:string){
     console.log(id);
      let dialogRef = this.dialog.open(UpdateVolunteerComponent, {
         width: '1000px',
         height:'400px',
        data:{id:id}
       });
       dialogRef.afterClosed().subscribe((result)=> {
           console.log(result); 
          // this.person = result;
   
          
          
       })
   
      
     }
  }
  

