import { Component, OnInit } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  role!:string;
constructor(public authServise:AuthService, private userservice:UserService){}
ngOnInit(): void {
  
  this.authServise.userState$.subscribe((value)=>{
    if(value)
    this.role=value.role+'';
  });
 
   
  
 
  }



}
