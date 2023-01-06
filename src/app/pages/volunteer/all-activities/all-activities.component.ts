import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
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
  role:string='';
  allcompanies!:Observable<opportunity[] | undefined>;
  allcompaniescopy!:Observable<opportunity[] | undefined>;



  constructor(private auth:AuthService,private oportunityservices:OportunitiesService){}
  ngOnInit(): void {
    this.allcompanies= this.oportunityservices.getAllOpportunities();
    this.allcompaniescopy =this.allcompanies;
  }


form=new FormGroup({
  type: new FormControl(''),
  name: new FormControl('')


})
  filterontype(){
    // this.allcompanies=this.allcompaniescopy.pipe(map(companies => companies!.filter(item => item.type==this.form.get('type')?.value)))
   
  }
  filteronname(){
    this.allcompanies=this.allcompaniescopy.pipe(map(companies => companies!.filter(item => (item.companyName).startsWith( this.form.get('name')?.value+''))))

  }


 

}
