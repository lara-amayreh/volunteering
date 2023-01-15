import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'citiesNames';
import { combineLatest, filter, map, Observable, of, startWith, switchMap } from 'rxjs';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { allSkills } from 'src/assets/arrays/skills';
import { ApplyOnActivityComponent } from '../apply-on-activity/apply-on-activity.component';

@Component({
  selector: 'app-all-activities',
  templateUrl: './all-activities.component.html',
  styleUrls: ['./all-activities.component.css'],
})
export class AllActivitiesComponent implements OnInit {
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  alloportunities!: opportunity[];
  // alloportunities:any[]=[];
  activityid: string = '';
  role!: string;
  uid!: string;
  profileImg!: string;
  cname!: string;
  counter: number = 0;
  skills = allSkills;
  filteredOptions!: Observable<string[]>;
  
  allcompanies : string[]=[];
  constructor(
    private af: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    private oportunityservices: OportunitiesService,
    private userservice: UserService
  ) {}

  ngOnInit(): void {

   
    // this.counter = this.oportunityservices.countApplicant(this.activityid);

    this.auth.userState$.subscribe((val) => {
      if (val) {
        this.role = val.role;
        this.uid = val.id;
        console.log(this.role);
        // this.oportunityservices.countApplicant(this.activityid).subscribe((val)=>{
        //   console.log(val.length);
        //   this.counter = val.length});
      }
    });
    this.oportunityservices.getAllOpportunities().subscribe((val) => {
     this.alloportunities = val as opportunity[];
     console.log(val[0].companyName);
     val.forEach((vall, index) => {
      //   // 👇️ name Tom 0, country Chile 1
      this.allcompanies?.push(val[index].companyName+'');
      console.log(val[index].companyName);

       });
      
    });
    this.filteredOptions = this.form.controls.comname.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  form=new FormGroup({
    skill: new FormControl(''),
    comname :new FormControl('')
  
  
  
  
  })
  get skill(){
    return this.form.get('skill')?.value;
  }
  get comname(){
    return this.form.get('comname')?.value;
  }
  
   
  filter(){
    console.log(this.form.get('skill')?.value)
    if(this.form.get('skill')?.value){
     this.userservice.getfilteredvolunteers(this.form?.get('skill')?.value,this.comname+'').subscribe((val)=>{
      if(val != null)
      this.alloportunities = val
     console.log(val);
     })}
     }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.allcompanies.filter(option => option.toLowerCase().includes(filterValue));
    }

  Apply(id: string) {
    console.log(id + 'act');
    this.activityid = id;
    let dialogRef = this.dialog.open(ApplyOnActivityComponent, {
      width: '700px',
      height: '400px',

      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        // this.oportunityservices.countApplicant(this.activityid).subscribe((val)=>{
        //   console.log(val.length);
        //   this.counter = val.length

        console.log(this.counter);
      }
      // this.person = result;
    });
  }
  chickapply(applicantsIds:string[],active:boolean){
let stat:boolean = false;
for (let i = 0; i < applicantsIds.length ; i++) {
if((applicantsIds[i]==this.uid)|| !active)
stat = true
}
return stat;
// applicantsIds.forEach((val)=>{
// if(val== this.uid || !active)
// stat= true;

// });
// return stat;
  }
}
