import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { OportunitiesService } from '../../services/oportunities/oportunities.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(public auth:AuthService,private oppoertunityservice:OportunitiesService,
     private dialogRef: MatDialogRef<NotificationComponent>,  
    @Inject(MAT_DIALOG_DATA) public data: any){
    
  }


closedialog(){
this.dialogRef.close(true);
}


}

