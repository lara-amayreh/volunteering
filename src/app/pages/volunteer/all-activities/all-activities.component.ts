import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'citiesNames';
import { combineLatest, filter, map, Observable, of, switchMap } from 'rxjs';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { UserService } from 'src/app/lib/services/user/user.service';
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
      if (val) this.alloportunities = val as opportunity[];
      
    });
  }

  form = new FormGroup({
    type: new FormControl(''),
    name: new FormControl(''),
  });
  filterontype() {
    // this.allcompanies=this.allcompaniescopy.pipe(map(companies => companies!.filter(item => item.type==this.form.get('type')?.value)))
  }
  filteronname() {
    // this.allcompanies=this.allcompaniescopy.pipe(map(companies => companies!.filter(item => (item.companyName).startsWith( this.form.get('name')?.value+''))))
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
applicantsIds.forEach((val)=>{
if(val== this.uid || !active)
stat= true;

})
return stat;
  }
}
