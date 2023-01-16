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
import { companytypes } from 'src/assets/arrays/company-types';
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
  alloportunities$!: Observable< opportunity[]>;
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
  types=companytypes;

  constructor(
    private af: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    private oportunityservices: OportunitiesService,
    private userservice: UserService
  ) {}

  ngOnInit(): void {

   
    // this.counter = this.oportunityservices.countApplicant(this.activityid);
    // this.types.push('All Types');

    this.auth.userState$.subscribe((val) => {
      if (val) {
        this.role = val.role;
        this.uid = val.id;
        // this.oportunityservices.countApplicant(this.activityid).subscribe((val)=>{
        //   console.log(val.length);
        //   this.counter = val.length});
      }
    });
    this.alloportunities$=this.oportunityservices.getAllOpportunities();


    this.alloportunities$.subscribe((val) => {
      val.forEach((vall, index) => {
       if (!this.allcompanies.includes(vall.companyName+''))
       this.allcompanies?.push(vall.companyName+'');
 
        });
       
    });
    this.filteredOptions = this.form.controls.comname.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  form=new FormGroup({
    skill: new FormControl<string[]>([]),
    comname :new FormControl(''),
    type: new FormControl(''),
    range: new FormGroup({
      start: new FormControl(''),
      end: new FormControl(''),
    }),
   
  
  
  
  })
  get range(): FormGroup {
    return this.form.get('range') as FormGroup;
  }
  get skill(){
    return this.form.get('skill')?.value;
  }
  get comname(){
    return this.form.get('comname')?.value;
  }
  get type(){
    return this.form.get('type')?.value;
  }
  
   
  filter(){
    console.log((this.range.value.start));
  
      this.alloportunities$ = this.oportunityservices.getfilteredopportunities(this.skill ,this.comname,this.type,this.range.value)
     
     
     }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.allcompanies.filter(option => option.toLowerCase().includes(filterValue));
    }

  Apply(id: string) {
    
    this.activityid = id;
    let dialogRef = this.dialog.open(ApplyOnActivityComponent, {
      width: '700px',
      height: '400px',

      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {

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
  }
}
