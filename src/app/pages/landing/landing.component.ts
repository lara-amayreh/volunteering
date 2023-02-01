import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApplyOnActivityComponent } from '../volunteer/apply-on-activity/apply-on-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { organization } from 'src/app/lib/inteerfaces/organization';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(
    private userservice: UserService,
    public dialog: MatDialog,
    public auth: AuthService,
    public oportunityservices: OportunitiesService,
    private fs: AngularFirestore
  ) {}
  alloportunities$!: Observable<opportunity[]>;
  latestopportunities$!: Observable<opportunity[]>;
  allorganizations$!: Observable<organization[] | undefined>;
  latestOrg$!: Observable<organization[]>;
  subscription!: Subscription;
  activityid!: string;
  uid!: string;
  role!: string;

  ngOnInit(): void {
    this.alloportunities$ = this.oportunityservices.getAllOpportunities();
    this.latestopportunities$ =this.oportunityservices.getTopOpportunities();
    this.latestOrg$ = this.userservice.getTopCompanies();
    this.auth.userState$.subscribe((user) => {
      if (user) {
        this.uid = user.id;
        this.role = user.role;
      }
    });
  }

  Apply(id: string) {
    this.activityid = id;
    let dialogRef = this.dialog.open(ApplyOnActivityComponent, {
      width: '700px',
      height: '400px',

      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  calculateDiff(sentDate: any){
    var date1:any =sentDate.toDate();
    var date2:any = new Date();
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
if(diffDays)
    return diffDays +' Days ago';
    else return Math.floor((date2 - date1) / (1000 * 60 * 60))+' Hours ago';
}
  chickapply(applicantsIds: string[], active: boolean) {
    let stat: boolean = false;
    for (let i = 0; i < applicantsIds.length; i++) {
      if (applicantsIds[i] == this.uid || !active) stat = true;
    }
    return stat;
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
