import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, of, startWith, Subscription, switchMap } from 'rxjs';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { allSkills } from 'src/assets/arrays/skills';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserService } from 'src/app/lib/services/user/user.service';


@Component({
  selector: 'app-add-opportunity',
  templateUrl: './add-opportunity.component.html',
  styleUrls: ['./add-opportunity.component.css']
})
export class AddOpportunityComponent{
  numberOfVolunteers!:number
  id!:string;
  userid!:string;
  numberofOpp:number=0;
userstate!:Observable<any>;
subscription!: Subscription;



  skills = allSkills;
  constructor(private userservice:UserService,private oportunityservice: OportunitiesService,private authservice:AuthService,
    private dialogRef: MatDialogRef<AddOpportunityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)

     {
   
  }

  ngOnInit(): void {
    // this.persons$= this.userservice.getuser();
  
    // this.filteredOptions = this.form.controls.city.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
  
    }
 
 
 
  
   form = new FormGroup({
    name:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    skill: new FormControl<string []>([],[Validators.required]),
    numberOfVolunteers: new FormControl<number|null>(null,[Validators.required, Validators.min(0)]),
    range :new FormGroup({
      start: new FormControl('',[Validators.required]),
      end: new FormControl(''),
    }),
   
  
});










confirm(){
this.userstate = this.authservice.userState$
.pipe(switchMap( (value) => {
  if(value){
    this.numberofOpp = value.numberOfApps;
    this.userid = value.id;
return this.oportunityservice.addOpportunity({
  userid : value.id,
// id:this.id,
  name:this.form.get('name')?.value +'',
  description:this.form.get('description')?.value+'',
  skills:   this.form.get('skill')?.value!,
  numberOfVolunteers:Number(this.form.get('numberOfVolunteers')?.value+''),
  range:this.range?.value,
  companyName:value.name,
  companyLogo:value.profileImg,
  numberOfApplicants:0,
  active:true,
applicantsIds:[],
companyType:value.type,
 creatDate:new Date(),
})

}
  
  else{
  return of (null);}}))
// })).subscribe((value)=>{
//   if(value)
//  {
//   this.id = value.id;
//   this.oportunityservice.updatid(this.id);
// //  this.userservice.updateNumberOfOppo(this.userid,this.numberofOpp + 1);
//   console.log(this.numberofOpp);}
// })
this.subscription = this.userstate.subscribe((value)=>{
 if(value)
{
 this.id = value.id;
 this.oportunityservice.updatid(this.id);
   this.userservice.updateNumberOfOppo(this.userid,this.numberofOpp + 1);
console.log(this.numberofOpp);}
this.dialogRef.close(true);


})}
ngOnDestroy() {
  this.subscription.unsubscribe()
}
get start(){
  return this.form.get('start');
 }
 get end(){
  return this.form.get('end');
 }
 get range() :FormGroup{
  return this.form.get('range') as FormGroup;
 }

 unavailableDates(calenderDate:Date):boolean{
  return (calenderDate > new Date());
}

}
