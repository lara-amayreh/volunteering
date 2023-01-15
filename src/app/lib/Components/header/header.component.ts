import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap } from 'rxjs';
import { organization } from '../../inteerfaces/organization';
import { person } from '../../inteerfaces/person';
import { SharedModuleModule } from '../../material/shared-module.module';
import { AuthService } from '../../services/auth/auth.service';
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
  constructor(public dialog: MatDialog , public authService: AuthService ,private fs:AngularFirestore, private fireAuth:AngularFireAuth){}
  ngOnInit(): void {
     this.authService.userState$.subscribe((val)=>{
if(val){
this.com=val;
this.role=val.role;
if(val.profileImg)
this.profileImg=val.profileImg;
}
    })
    this.fireAuth.authState.subscribe((value)=>{
  if(value)
this.email = value.email+'';})
  }


  geturl(){
 
    let x= `url("${this.profileImg}")` ;
    return x;
  }
  openNotification(){
    let dialogRef = this.dialog.open(NotificationComponent, {
      width: '700px',
      height:'500px',
      
     
    });
    dialogRef.afterClosed().subscribe((result)=> {
        console.log(result); 
        

        //this.students = this.studentsService.getStudents();
       
    })
    
  }
}