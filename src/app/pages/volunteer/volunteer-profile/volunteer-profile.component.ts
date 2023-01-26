import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { person } from 'src/app/lib/inteerfaces/person';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
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
   opportunities$!:Observable <opportunity[] | undefined>;
   userstate$!:Observable<any>;
   sub!:Subscription;
   public id:string='';
   userid!:string;
role!:string;
  constructor(private opportunityservice:OportunitiesService,private route:ActivatedRoute, public dialog: MatDialog, public userservice:UserService,public authservice:AuthService)
  {this.person$ = this.route.paramMap.pipe(
    switchMap((value)=> {
      this.id = value.get('id')+'';
          return this.userservice.getuserById(this.id);


    
    }  )


    )}

  ngOnInit(): void {
    this.userstate$=this.authservice.userState$;
    this.sub = this.userstate$.subscribe((value)=>{
      if(value)
      this.role = value.role;
      this.userid = value.id;
      this.opportunities$ = this.opportunityservice.getUserOpportunities(this.id);

    })
    
    
    }
  
    updateprofile(id:string){
    //  console.log(id);
      let dialogRef = this.dialog.open(UpdateVolunteerComponent, {
         width: '1000px',
         height:'400px',
        data:{id:id}
       });
       dialogRef.afterClosed().subscribe((result)=> {
        if(result)
        alert('your profile updated successfully')
          //  console.log(result); 
          // this.person = result;
   
          
          
       })
   
      
     }
     ngOnDestroy() {
      this.sub.unsubscribe();
    }

  }
  

