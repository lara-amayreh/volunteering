import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { apply, MyEnum } from 'src/app/lib/inteerfaces/apply';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { ApplyOnActivityComponent } from '../../volunteer/apply-on-activity/apply-on-activity.component';

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
  userdetails! :Observable<apply[]>;
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
numberofapplicants:number=0;
role!:string;
uid!:string;

  id!: string;
  constructor(public dialog: MatDialog,
    public auth:AuthService, private opportunityservice:OportunitiesService, private route:ActivatedRoute){
    this.opportunity$ = this.route.paramMap.pipe(
      switchMap((value)=> {
        this.id = value.get('id')+'';
        // console.log(this.id);
        return this.opportunityservice.getoportunityById(this.id);
  
  
      
      }
  
      )
    )}
  
  
  ngOnInit(): void {
   this.auth.userState$.subscribe((value)=>{
      if(value){
        this.role=value.role;
        this.uid = value.id;
        this.opportunityservice.getoportunityById(this.id).subscribe((ele)=>{
          if(ele?.applicantsIds.includes(value.id)){
        this.userdetails=this.opportunityservice.getvolunteer(value.id,this.id);
        this.userdetails.subscribe((i)=>{
          // console.log(i[0]);
        })}
        })}
      this.waitting = this.opportunityservice.getApplicantsByState(this.id,MyEnum.wait)
      this.approved = this.opportunityservice.getApplicantsByState(this.id,MyEnum.approve)
      this.rejected = this.opportunityservice.getApplicantsByState(this.id,MyEnum.reject)
      
// this.userid=value.id;
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
Apply(id: string) {
    
  // this.activityid = id;
  let dialogRef = this.dialog.open(ApplyOnActivityComponent, {
    width: '700px',
    height: '400px',

    data: { id: id },
  });
  dialogRef.afterClosed().subscribe((result) => {
    // console.log(result);
    if (result) {

      // console.log(this.counter);
    }
    // this.person = result;
  });
}
chickapply(applicantsIds:string[],active:boolean){
  // console.log(applicantsIds);
let stat:boolean = false;
for (let i = 0; i < applicantsIds.length ; i++) {
if((applicantsIds[i]==this.uid)|| !active)
stat = true
}
return stat;
}

}
