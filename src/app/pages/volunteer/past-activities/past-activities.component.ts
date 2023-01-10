import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs';
import { apply } from 'src/app/lib/inteerfaces/apply';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';

@Component({
  selector: 'app-past-activities',
  templateUrl: './past-activities.component.html',
  styleUrls: ['./past-activities.component.css']
})
export class PastActivitiesComponent implements OnInit {
  userid!:string;
  activities:any[]=[];
  constructor(private oportunityservice:OportunitiesService, public auth:AuthService, private fs:AngularFirestore ){}
  ngOnInit(): void {
    this.auth.userState$.subscribe((value)=>{
      if(value){
        this.userid=value.id;
      }
    })
   this.oportunityservice.getAllOpportunities().subscribe((val)=>{
    if(val){
      val.forEach((ele)=>{
         return this.oportunityservice.getAppliedOpportunities(this.userid,ele.id+'').subscribe((values)=>{
          this.activities.push(values);
        })
      })
    }console.log(this.activities);
   })
   

}
}