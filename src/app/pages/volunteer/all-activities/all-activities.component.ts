import { Component, OnInit } from '@angular/core';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';

@Component({
  selector: 'app-all-activities',
  templateUrl: './all-activities.component.html',
  styleUrls: ['./all-activities.component.css']
})
export class AllActivitiesComponent implements OnInit{
  alloportunities!:opportunity[];
  constructor(private auth:AuthService,private oportunityservices:OportunitiesService){}
  ngOnInit(): void {
 this.oportunityservices.getAllOpportunities().subscribe((response)=>{
if(response){
  this.alloportunities=response;
  console.log(this.alloportunities);
}
})
  }

}
