import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { UpdateVolunteerComponent } from '../update-volunteer/update-volunteer.component';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { person } from 'src/app/lib/inteerfaces/person';



@Component({
  selector: 'app-apply-on-activity',
  templateUrl: './apply-on-activity.component.html',
  styleUrls: ['./apply-on-activity.component.css']
})
export class ApplyOnActivityComponent {
  personid:string='';
  oportunity!:opportunity;
  userdetails!:person;
  startDate!:any;
  endDate!:any;

  constructor(private oportunityservice:OportunitiesService, private userservice:UserService, private auth:AuthService, private dialogRef: MatDialogRef<UpdateVolunteerComponent>, public firestore:AngularFirestore,
 
    @Inject(MAT_DIALOG_DATA) public data: {id: string , obj:opportunity}){}


     form = new FormGroup({
      volunteerin:new FormControl('',[Validators.required]),
      whyvolunteer:new FormControl('',[Validators.required]),
      range :new FormGroup({
        start: new FormControl('',[Validators.required]),
        end: new FormControl('',[Validators.required]),
      }),
    
     
    
  })

  ngOnInit(): void {
    this.auth.userState$.subscribe((val)=>{
      if (val){
        this.personid = val.id;
        this.userdetails = val;
      }
    })
  this.oportunityservice.getoportunityById(this.data.id).subscribe((val)=>{
     if(val){
     this.oportunity = val as opportunity;
       this.startDate = val.range.start;

    
     
//     //  const currentYear = new Date().getDate();
//     this.startDate = val.range.start;
//     // this.endDate = new Date(currentYear);
//     console.log(this.startDate.toDateString());


     }
    })
  }
    
    
  
    

  unavailableDates(calenderDate:Date):boolean{
    return calenderDate > new Date();
    
  }
  get range() :FormGroup{
    return this.form.get('range') as FormGroup;
   }
submit(){


this.oportunityservice.addApplicant(this.oportunity.id+'' ,({
  uid: this.personid,
  oportunityId:this.oportunity.id,
VolunteerIn:this.form.get('volunteerin')?.value+'',
whyApply:this.form.get('whyvolunteer')?.value+'',
 availabledate:this.range?.value,
 userdetails:this.userdetails,
})  ).then((val)=> {
  if(this.oportunity.applicantsIds == null) this.oportunity.applicantsIds = [];
  this.oportunity.applicantsIds.push(this.personid);
  this.oportunityservice.updatecount(this.oportunity.id+'',(this.oportunity.numberOfApplicants)+1,this.oportunity.applicantsIds);

}
)


console.log(this.form.value);
if(this.form.valid)
  this.dialogRef.close(true);
  else this.dialogRef.close(false);
}
}
