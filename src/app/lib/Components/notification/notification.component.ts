import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { OportunitiesService } from '../../services/oportunities/oportunities.service';
import {Observable, Subscription } from 'rxjs';
import { apply, MyEnum } from '../../inteerfaces/apply';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  requests$: any[] = [];
  role!: string;
  userstate!:Observable<any>;

  subscription!: Subscription;

  constructor(
    public auth: AuthService,
    private oppoertunityservice: OportunitiesService,
    private dialogRef: MatDialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
   this.userstate = this.auth.userState$;
   this.subscription = this.userstate.subscribe((val) => {
      if (val) {
        this.role = val.role;
        if(this.data.request)
        this.requests$ = this.data.request;
        console.log(this.requests$);
      }
    });
  }

  closedialog() {
    this.dialogRef.close(true);
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
