import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { data } from 'citiesNames';
import { map, Observable, startWith } from 'rxjs';
import { cities } from 'src/app/lib/inteerfaces/cities';
import { person } from 'src/app/lib/inteerfaces/person';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { allSkills } from 'src/assets/arrays/skills';

@Component({
  selector: 'app-all-volunteers',
  templateUrl: './all-volunteers.component.html',
  styleUrls: ['./all-volunteers.component.css']
})
export class AllVolunteersComponent implements OnInit {
AllVolunteers!:person[];
allimages:string[]=[];
skills = allSkills;
filteredOptions!: Observable<cities[]>;

Allcities = data;
constructor(private userservice:UserService,public auth:AuthService){}
ngOnInit(): void {
  this.filteredOptions = this.form.controls.city.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );


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

form=new FormGroup({
  skill: new FormControl(''),
  city :new FormControl('')




})
get skill(){
  return this.form.get('skill')?.value;
}
get city(){
  return this.form.get('city')?.value;
}

 
filter(){
<<<<<<< HEAD
  console.log(this.form.get('skill')?.value);
   this.userservice.getfilteredvolunteers(this.form.get('skill')?.value,this.city+'').subscribe((val)=>{
    if(val != null)
    this.AllVolunteers = val
   console.log(val);
   })
=======
  console.log(this.form.get('skill')?.value)
  if(this.form.get('skill')?.value){
   this.userservice.getfilteredvolunteers(this.form?.get('skill')?.value,this.city+'').subscribe((val)=>{
    if(val != null)
    this.AllVolunteers = val
   console.log(val);
   })}
>>>>>>> 79236132446034c752f2538a4f8b4116c8f7d0b2
   }

  private _filter(value: string): cities[] {
    const filterValue = value.toLowerCase();

    return this.Allcities.filter(option => option.city.toLowerCase().includes(filterValue));
  }
}





  


