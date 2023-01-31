import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription, switchMap } from 'rxjs';
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
  sub!:Subscription;
  userstate$!:Observable<any>;
  activitydetails$!:Observable <apply |undefined>;
  activities$!:Observable<opportunity[]|undefined>;
  constructor(private oportunityservice:OportunitiesService, public auth:AuthService, private fs:AngularFirestore ){}
  ngOnInit(): void {
    console.log('ng on inti');
    this.userstate$ = this.auth.userState$;
    this.sub= this.userstate$.subscribe((val)=>{
      if(val){
this.userid = val.id;
this.role = val.role;
this.activities$= this.oportunityservice.getUserOpportunities(this.userid);

   } })
    }
    calculateDiff(sentDate: any){
      var date1:any =sentDate.toDate();
      var date2:any = new Date();
      var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
  if(diffDays)
      return diffDays +' Days ago';
      else return Math.floor((date2 - date1) / (1000 * 60 * 60))+' Hours ago';
  }
    chickapply(applicantsIds:string[],active:boolean){
      let stat:boolean = false;
      applicantsIds.forEach((val)=>{
        if(val)
      if(val== this.userid || !active)
      stat= true;
      
      })
      return stat;
        }
        ngOnDestroy() {
          this.sub.unsubscribe()
        }
}
