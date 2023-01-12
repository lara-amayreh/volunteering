import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { apply } from 'src/app/lib/inteerfaces/apply';
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
  approved!:apply[];
  rejected! :apply[];



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
      this.waitting = this.opportunityservice.getApplicantsByState(this.id,'waitting')
       
      
// this.userid=value.id;
    }
    })
    // this.opportunityservice.getoportunityById()
  }

}
