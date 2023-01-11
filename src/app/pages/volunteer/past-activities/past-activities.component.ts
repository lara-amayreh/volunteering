import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, switchMap } from 'rxjs';
import { apply } from 'src/app/lib/inteerfaces/apply';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';

@Component({
  selector: 'app-past-activities',
  templateUrl: './past-activities.component.html',
  styleUrls: ['./past-activities.component.css']
})
export class PastActivitiesComponent implements OnInit {
  userid!:string;
  role!:string;
  activities$!:Observable<opportunity[]|undefined>;
  constructor(private oportunityservice:OportunitiesService, public auth:AuthService, private fs:AngularFirestore ){}
  ngOnInit(): void {
    this.auth.userState$.subscribe((val)=>{
this.userid = val.id;
this.role = val.role;
this.activities$= this.oportunityservice.getUserOpportunities(this.userid)
    })
    }

    chickapply(applicantsIds:string[],active:boolean){
      let stat:boolean = false;
      applicantsIds.forEach((val)=>{
      if(val== this.userid || !active)
      stat= true;
      
      })
      return stat;
        }
}
