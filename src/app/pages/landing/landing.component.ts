import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AllActivitiesComponent } from '../volunteer/all-activities/all-activities.component';
import { VolunteerModule } from '../volunteer/volunteer.module';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApplyOnActivityComponent } from '../volunteer/apply-on-activity/apply-on-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { organization } from 'src/app/lib/inteerfaces/organization';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],

})
export class LandingComponent implements OnInit {
  constructor( private userservice:UserService,public dialog: MatDialog,
    public auth: AuthService,public oportunityservices:OportunitiesService , private fs:AngularFirestore ){}
  alloportunities$! : Observable<opportunity[]>
  latestopportunities$!: Observable<opportunity[]>;
  allorganizations$!:Observable<organization[]|undefined>;
  latestOrg$!: Observable<organization[]>;

  activityid!:string;
 uid!:string;
 role!:string;


  ngOnInit(): void {
    
  
    this.alloportunities$=this.oportunityservices.getAllOpportunities();
    this.alloportunities$.subscribe((g)=>{
      console.log(g);
    })
    this.latestopportunities$ = this.fs.collection<opportunity>('oportunities',
    ref=>ref
    .orderBy("range.start", "desc").where('range.start',">",new Date())
    .limit(3)).valueChanges({idField:"id"}); 
    // this.latestopportunities$.subscribe((v)=>{
    // })
    this.allorganizations$=this.userservice.getAllusersByRole('company');
    this.latestOrg$ = this.fs.collection<any>('users',
    ref=>ref
    .where('role',"==",'company')
    .limit(4)).valueChanges({idField:"id"}); 
    // this.latestopportunities$.subscribe((v)=>{
    // })

    this.auth.userState$.subscribe((user)=>{
      if(user){
      this.uid=user.id;
      this.role=user.role;  
    }});
      }
  

  

  Apply(id: string) {
    
    this.activityid = id;
    let dialogRef = this.dialog.open(ApplyOnActivityComponent, {
      width: '700px',
      height: '400px',

      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {

      }
      // this.person = result;
    });
  }
  chickapply(applicantsIds:string[],active:boolean){
let stat:boolean = false;
for (let i = 0; i < applicantsIds.length ; i++) {
if((applicantsIds[i]==this.uid)|| !active)
stat = true
}
return stat;
  }

}
