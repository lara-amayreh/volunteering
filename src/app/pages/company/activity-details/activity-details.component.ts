import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { apply, MyEnum } from 'src/app/lib/inteerfaces/apply';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit  {
  opportunity$!: Observable <opportunity | undefined>;
  waitting!:Observable<apply[]>;
  approved!:Observable<apply[]>;
  rejected! :Observable<apply[]>;
numberofapplicants:number=0;


  id!: string;
  constructor(public auth:AuthService, private opportunityservice:OportunitiesService, private route:ActivatedRoute){
    this.opportunity$ = this.route.paramMap.pipe(
      switchMap((value)=> {
        this.id = value.get('id')+'';
        console.log(this.id);
        return this.opportunityservice.getoportunityById(this.id);
  
  
      
      }
  
      )
    )}
  
  
  ngOnInit(): void {
   this.auth.userState$.subscribe((value)=>{
      if(value){
      this.waitting = this.opportunityservice.getApplicantsByState(this.id,MyEnum.wait)
      this.approved = this.opportunityservice.getApplicantsByState(this.id,MyEnum.approve)
      this.rejected = this.opportunityservice.getApplicantsByState(this.id,MyEnum.reject)
      
// this.userid=value.id;
    }
    })
    // this.opportunityservice.getoportunityById()
  }



approve(uid:string,oportunityId:string){
  this.opportunityservice.getvolunteer(uid,oportunityId).subscribe((v)=>{
    // console.log(v[0].id)
    this.opportunityservice.updateState(v[0].id,MyEnum.approve,oportunityId).subscribe((val)=>{
    //  console.log(val);
     })
  })

}
reject(uid:string,oportunityId:string){
  this.opportunityservice.getvolunteer(uid,oportunityId).subscribe((v)=>{
    // console.log(v[0].id)
    this.opportunityservice.updateState(v[0].id,MyEnum.reject,oportunityId);})
    this.opportunityservice.getoportunityById(oportunityId).subscribe((oportunity)=>
   
    { 
      let arr:string[] = oportunity?.applicantsIds!;
      
      if(oportunity){
        for (let i = 0; i < arr.length ; i++) {
          if(arr[i]==uid)
          arr.splice(i,1);
        }


           
      this.opportunityservice.updatecount(oportunityId,arr.length, arr ,true);
    }
  }
    )



}
}
