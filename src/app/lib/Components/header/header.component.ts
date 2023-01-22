import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap } from 'rxjs';
import { apply, MyEnum } from '../../inteerfaces/apply';
import { organization } from '../../inteerfaces/organization';
import { person } from '../../inteerfaces/person';
import { SharedModuleModule } from '../../material/shared-module.module';
import { AuthService } from '../../services/auth/auth.service';
import { OportunitiesService } from '../../services/oportunities/oportunities.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role!: string;
  name!:string;
  com!:any;
  email!:string;
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  profileImg:string='../../../../../assets/images/profile-img.png';
  userState$!:Observable<any>;
  requests$:apply[]=[];
  noi!:number|null;
  constructor(public dialog: MatDialog ,private oppoertunityservice:OportunitiesService , public authService: AuthService ,private fs:AngularFirestore, private fireAuth:AngularFireAuth){}
  
  
  ngOnInit(): void {
     this.authService.userState$.subscribe((val)=>{
if(val){
this.com=val;
this.role=val.role;
if(val.profileImg)
this.profileImg=val.profileImg;

this.oppoertunityservice.getUserOpportunities(val.id).subscribe((v)=>{
  console.log(v);
 v.forEach((valu)=>{
  if(valu!=null)
 this.oppoertunityservice.getNotifications(valu.id+'',MyEnum.wait,val.id)
 .subscribe((not)=>{
  if(!this.requests$.includes(not[0]) && not[0]!=null){
this.requests$.push(not[0]);
  console.log(not);
  this.noi=this.requests$.length;
}
 
 });
//  console.log(this.requests$);

 


 
 })



}
)}









// this.oppoertunityservice.getUserOpportunities(val.id).subscribe((v)=>{
//  if(v!=null){
//  v.forEach((valu)=>{
//   if(valu!=null)
//  this.oppoertunityservice.getNotifications(valu.id+'',MyEnum.wait,val.id)
//  .subscribe((not)=>{
//   if(not[0] != null){
//   this.requests$.push(not[0]);
//  console.log(this.requests$);
//  this.noi=this.requests$.length;

//   }
 
//  })



 
//  })
//  console.log(this.requests$);


// }}
// )}
     
    this.fireAuth.authState.subscribe((value)=>{
  if(value)
this.email = value.email+'';


     })

    
  

    })}

  
  geturl(){
    let x= `url("${this.profileImg}")` ;
    return x;
  }
  openNotification(){
    let dialogRef = this.dialog.open(NotificationComponent, {
      width: '700px',
      height:'500px'
     
    });
    dialogRef.afterClosed().subscribe((result)=> {
    this.noi=null;
        

        //this.students = this.studentsService.getStudents();
       
    })
    
  }
}