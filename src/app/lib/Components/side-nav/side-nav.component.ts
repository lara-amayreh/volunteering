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
  loged!:any;
constructor(public authServise:AuthService, private userservice:UserService){}
ngOnInit(): void {
  
  this.authServise.userState$
  .pipe(switchMap( (value) => {
  if(value){
 console.log(value);
 console.log(value.uid);

    return this.userservice.getuser(value?.uid);

   
  }
    else
    return of(null);
   
  })).subscribe((response)=>{
    if(response)
 this.loged =response[0].role;
 console.log(this.loged[0].role);
 
  })
  
  
  }



}
