import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { organization } from '../../inteerfaces/organization';
import { person } from '../../inteerfaces/person';
import { SharedModuleModule } from '../../material/shared-module.module';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role!: string;
  name!:string;
  com!:any;
  userState$!:Observable<any>;
  constructor(public authService: AuthService ,private fs:AngularFirestore, private fireAuth:AngularFireAuth){}
  ngOnInit(): void {
     this.authService.userState$.subscribe((val)=>{
if(val){
this.com=val;
console.log(val.role);
this.role=val.role;
}
    })
  }
}