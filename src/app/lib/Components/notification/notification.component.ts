import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { OportunitiesService } from '../../services/oportunities/oportunities.service';
import { filter, Observable } from 'rxjs';
import { apply, MyEnum } from '../../inteerfaces/apply';
import { V } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  requests$:apply[]=[];
  len!:number;
  role!:string;
  constructor(public auth:AuthService,private oppoertunityservice:OportunitiesService,
     private dialogRef: MatDialogRef<NotificationComponent>,  
    @Inject(MAT_DIALOG_DATA) public data:any){

    
    
  }
  ngOnInit(): void {
    this.auth.userState$.subscribe((val)=>{
      if(val){
        this.role=val.role;
        this.requests$=this.data.request;
      }})}
      // this.oppoertunityservice.getUserOpportunities(val.id).subscribe((v)=>{
      //   // console.log(v);
      //  v.forEach((valu)=>{
      //   if(valu!=null)
      //  this.oppoertunityservice.getNotifications(valu.id+'',MyEnum.wait,val.id)
      //  .subscribe((not)=>{
      //   if(not[0] !=null){
      // this.requests$.push(not[0]);
      //   // console.log(not);
      // }
       
      //  });
      // //  console.log(this.requests$);
      
       
      
      
       
      //  })
      
      
      
      // }
      // )}
    
  
    
   

    
  


closedialog(){
//   this.requests$.subscribe((v)=>{
//     this.len = v.length;
//     console.log(v.length);
 this.dialogRef.close(true);


// })
}




}
