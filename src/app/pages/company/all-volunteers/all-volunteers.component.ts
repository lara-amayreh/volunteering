import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { person } from 'src/app/lib/inteerfaces/person';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { UserService } from 'src/app/lib/services/user/user.service';

@Component({
  selector: 'app-all-volunteers',
  templateUrl: './all-volunteers.component.html',
  styleUrls: ['./all-volunteers.component.css']
})
export class AllVolunteersComponent implements OnInit {
AllVolunteers!:person[];
allimages:string[]=[];
constructor(private userservice:UserService,public auth:AuthService){}
ngOnInit(): void {
  this.auth.userState$.subscribe((value)=>{
    if(value){
     this.userservice.getAllusersByRole('person').subscribe((val)=>{
      if(val){
this.AllVolunteers = val;
console.log(val);
val.forEach((person)=>{
  this.allimages.push(person.profileImage)});
      }
    });}
  })}
  geturl(index:number){
 if(this.allimages){
    let x= `url("${this.allimages[index]}")` ;
    console.log(x);
    return x;
  }

  return;
}
}


  


