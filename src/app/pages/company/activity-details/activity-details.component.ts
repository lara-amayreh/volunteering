import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  Observable,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';

import { apply, MyEnum } from 'src/app/lib/inteerfaces/apply';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { orgnotifications } from 'src/app/lib/inteerfaces/org-notifications';
import { person } from 'src/app/lib/inteerfaces/person';
import { personNotifications } from 'src/app/lib/inteerfaces/person-notification';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { PersonnotificationService } from 'src/app/lib/services/notifications/personnotification.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { ApplyOnActivityComponent } from '../../volunteer/apply-on-activity/apply-on-activity.component';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],
})
export class ActivityDetailsComponent implements OnInit {
  opportunity$!: Observable<opportunity | undefined>;
  opportunityr$!: Observable<opportunity | undefined>;

  waitting!: Observable<apply[]>;
  approved!: Observable<apply[]>;
  rejected!: Observable<apply[]>;
  volunteer$!: Observable<any[]>;
  volunteerr$!: Observable<any[]>;
  userstate$!: Observable<any>;

  companyName!: string;
  volunteerw$!: Observable<any[]>;

  sub1!: Subscription;
  sub2!: Subscription;
  sub3!: Subscription;
  sub4!: Subscription;
  sub5!: Subscription;
  userdetails!: Observable<apply[]>;
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  numberofapplicants: number = 0;
  role!: string;
  uid!: string;
  volunteerform!: Observable<apply[]>;
  id!: string;
  constructor(
    public dialog: MatDialog,
    private personnotsrvice: PersonnotificationService,
    public auth: AuthService,
    private opportunityservice: OportunitiesService,
    private route: ActivatedRoute
  ) {
    console.log('activity details');
    this.opportunity$ = this.route.paramMap.pipe(
      switchMap((value) => {
        this.id = value.get('id') + '';

        return this.opportunityservice.getoportunityById(this.id);
      })
    );

    combineLatest(this.auth.userState$, this.route.paramMap)
      .pipe(
        switchMap(([x, paramMap]) => {
          this.id = paramMap.get('id') + '';

          if (x) {
            this.role = x.role;
            this.uid = x.id;
            this.volunteerform = this.opportunityservice.getvolunteer(
              x.id,
              this.id
            );

            this.companyName = x.name;
            this.waitting = this.opportunityservice.getApplicantsByState(
              this.id,
              MyEnum.wait
            );
            this.approved = this.opportunityservice.getApplicantsByState(
              this.id,
              MyEnum.approve
            );
            this.rejected = this.opportunityservice.getApplicantsByState(
              this.id,
              MyEnum.reject
            );
          }

          return this.opportunityservice.getoportunityById(this.id);
        })
      )
      .subscribe((ele) => {
        if (ele)
          if (ele?.applicantsIds.length > 0) {
            this.userdetails = this.opportunityservice.getvolunteer(
              this.uid,
              this.id
            );
          }
      });
  }

  ngOnInit(): void {
   
  }

  approve(uid: string, oportunityId: string) {
    this.volunteer$ = this.opportunityservice.getvolunteer(uid, oportunityId);
    this.sub1 = this.volunteer$.pipe(take(1)).subscribe((v) => {
      if (v)
        this.opportunityservice.updateState(
          v[0].id,
          MyEnum.approve,
          oportunityId
        );
      this.addPersonNotification(
        uid,
        this.companyName,
        v[0].oportunityName,
        v[0].oportunityId,
        MyEnum.approve,
        new Date(),
        false
      );
    });
  }
  addPersonNotification(
    uid: string,
    cname: string,
    oppName: string,
    oppid: string,
    state: MyEnum,
    date: Date,
    seen: boolean
  ) {
    this.personnotsrvice.addNotification({
      uid: uid,
      companyName: cname,
      opportunityName: oppName,
      opportunityId: oppid,
      opportunityStatus: state,
      notiDate: date,
      seenFlag: seen,
    });
  }
  reject(uid: string, oportunityId: string) {
    this.volunteerr$ = this.opportunityservice.getvolunteer(uid, oportunityId);
    this.sub2 = this.volunteerr$.pipe(take(1)).subscribe((v) => {
      if (v)
        this.opportunityservice.updateState(
          v[0].id,
          MyEnum.reject,
          oportunityId
        );
      this.addPersonNotification(
        uid,
        this.companyName,
        v[0].oportunityName,
        v[0].oportunityId,
        MyEnum.reject,
        new Date(),
        false
      );
    });

    this.opportunityr$ =
      this.opportunityservice.getoportunityById(oportunityId);
    this.sub3 = this.opportunityr$.subscribe((oportunity) => {
      if (oportunity) {
        let arr: string[] = oportunity?.applicantsIds!;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == uid) arr.splice(i, 1);
        }

        this.opportunityservice.updatecount(
          oportunityId,
          arr.length,
          arr,
          true
        );
      }
    });
  }
  Apply(id: string) {
    let dialogRef = this.dialog.open(ApplyOnActivityComponent, {
      width: '700px',
      height: '400px',

      data: { id: id },
    });
  }
  chickapply(applicantsIds: string[], active: boolean) {
    let stat: boolean = false;
    for (let i = 0; i < applicantsIds.length; i++) {
      if (applicantsIds[i] == this.uid || !active) stat = true;
    }
    return stat;
  }
  ngOnDestroy() {}
}
