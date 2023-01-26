import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subscription, switchMap, take, tap } from 'rxjs';
import { apply, MyEnum } from '../../inteerfaces/apply';
import { opportunity } from '../../inteerfaces/opportunity';
import { orgnotifications } from '../../inteerfaces/org-notifications';
import { organization } from '../../inteerfaces/organization';
import { person } from '../../inteerfaces/person';
import { personNotifications } from '../../inteerfaces/person-notification';
import { SharedModuleModule } from '../../material/shared-module.module';
import { AuthService } from '../../services/auth/auth.service';
import { OrgnotificationService } from '../../services/notifications/orgnotification.service';
import { PersonnotificationService } from '../../services/notifications/personnotification.service';
import { OportunitiesService } from '../../services/oportunities/oportunities.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  role!: string;
  name!: string;
  com!: any;
  email!: string;
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  profileImg: string = '../../../../../assets/images/profile-img.png';
  userState$!: Observable<any>;
  req$!: Observable<opportunity[] |undefined>;
  notifications$!: Observable<apply[] |undefined>;
  req$2!: Observable<opportunity[] |undefined>;
  notifications2$!: Observable<apply[] |undefined>;
sub2!:Subscription;
sub3!:Subscription;
sub4!:Subscription;
sub5!:Subscription;


  requests$: any = [];
  noi!: number | null;
  uid!: string;
  subscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private personNotifService:PersonnotificationService,
    private oppoertunityservice: OportunitiesService,
    private orgnotiservice:OrgnotificationService,
    public authService: AuthService,
    private fs: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.userState$ = this.authService.userState$;
   this.subscription= this.userState$
   .pipe(take(1), tap(val=> console.log(val)))
   
   .subscribe((val) => {
      if (val) {
        this.com = val;
        this.role = val.role;
        this.uid = val.id;
        if (val.profileImg) this.profileImg = val.profileImg;
        // if (this.role == 'person') {
        //   this.req$ = this.oppoertunityservice
        //     .getUserOpportunities(val.id);  //this should be switchmap instead of nesting the subcribe function
        //   this.sub2 = this.req$
        //   .pipe(take(1), tap(val=> console.log(val)))
        //   .subscribe((v) => {
        //     if(v)
        //       v.forEach((valu) => {
        //         if (valu)
        //           this.notifications$ = this.oppoertunityservice
        //             .getNotifications(valu.id + '', MyEnum.wait, val.id);
        //            this.sub3 = this.notifications$
        //            .pipe(take(1), tap(val=> console.log(val)))
        //            .subscribe((not) => {
        //             if(not)
        //             if(not[0] != undefined){
        //               // if (!this.requests$.includes(not[0]) && not[0] != null)
                       
        //                 console.log(not[0]);
        //                 this.requests$.push(not[0]);
        //                 this.noi = this.requests$.length;
        //               }
        //             });
        //       });
        //     });
        // }
        if(this.role=='person'){
          this.personNotifService.getNotification(this.uid).subscribe((notifications)=>{
            this.requests$ = notifications;
            
          })

        }
      

if(this.role == 'company'){
  this.orgnotiservice.getNotification(this.uid).subscribe((notifications)=>{
    this.requests$ = notifications;
  })
}
      }
      // if (this.role == 'company') {
      //   this.req$2=this.oppoertunityservice.getOpportunities(this.uid);
      //   this.sub4 = this.req$2
      //   .pipe(take(1), tap(val=> console.log(val)))
      //   .subscribe((f) => {
      //     if(f)
      //     f.forEach((va) => {
      //       if (va != null)
      //        this.notifications2$= this.oppoertunityservice
      //           .getcompanynotifications(va.id + '', MyEnum.wait);
      //         this.sub5=this.notifications2$
      //         .pipe(take(1), tap(val=> console.log(val)))
      //         .subscribe((not) => {
      //           if(not)
      //             if (!this.requests$.includes(not[0]) && not[0] != null) 
      //             {
      //               this.requests$.push(not[0]);
      //               this.noi = this.requests$.length;
      //             }
      //           });
      //     });
      //   });
      // }

      this.fireAuth.authState.subscribe((value) => {
        if (value) this.email = value.email + '';
      });
    });
  }

  geturl() {
    let x = `url("${this.profileImg}")`;
    return x;
  }
  openNotification() {
    let dialogRef = this.dialog.open(NotificationComponent, {
      width: '700px',
      height: '500px',
      data: { request: this.requests$ },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.noi = null;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();




  }
}
