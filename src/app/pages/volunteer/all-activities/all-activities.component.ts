import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, filter, map, Observable, of, switchMap } from 'rxjs';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { UserService } from 'src/app/lib/services/user/user.service';

@Component({
  selector: 'app-all-activities',
  templateUrl: './all-activities.component.html',
  styleUrls: ['./all-activities.component.css']
})
export class AllActivitiesComponent implements OnInit{
   alloportunities!:opportunity [];
  // alloportunities:any[]=[];

  role:string='';
 
  profileImg!: string;
  cname!: string;



  constructor( private af:AngularFirestore
   ,public auth:AuthService,private oportunityservices:OportunitiesService,private userservice:UserService){}
 

ngOnInit(): void {
this.oportunityservices.getAllOpportunities().subscribe((val)=>{
   if(val)
   this.alloportunities = val as opportunity[];
  }
  )
  
}
  
     
form=new FormGroup({
  type: new FormControl(''),
  name: new FormControl('')


})
  filterontype(){
    // this.allcompanies=this.allcompaniescopy.pipe(map(companies => companies!.filter(item => item.type==this.form.get('type')?.value)))
   
  }
  filteronname(){
    // this.allcompanies=this.allcompaniescopy.pipe(map(companies => companies!.filter(item => (item.companyName).startsWith( this.form.get('name')?.value+''))))

  }


 

}
