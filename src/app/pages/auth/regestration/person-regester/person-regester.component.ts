import {FormArray, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { data } from 'citiesNames';
import { allSkills } from 'src/assets/arrays/skills';
import { experience } from 'src/assets/arrays/experience';
import { days } from 'src/assets/arrays/days';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, range} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PersonsService } from 'src/app/lib/services/person/persons.service';
import { courses, person } from 'src/app/lib/inteerfaces/person';

import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

import { passwordMatchingValidator } from 'src/app/lib/validators/passwordmatching';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { UserService } from 'src/app/lib/services/user/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StorageService } from 'src/app/lib/services/storage/storage.service';
import { cities } from 'src/app/lib/inteerfaces/cities';





@Component({
  selector: 'app-person-regester',
  templateUrl: './person-regester.component.html',
  styleUrls: ['./person-regester.component.css'],

})
export class PersonRegesterComponent implements OnInit {
  downloadurl:string='../../../../../assets/images/profile-img.png';
  filteredOptions!: Observable<cities[]>;
  Allcities = data;
  skills = allSkills;

  constructor( private afStorage: AngularFireStorage ,private router: Router, public auth:AuthService, private storge:StorageService) 
  {}
 
  ngOnInit(): void {
  // this.persons$= this.userservice.getuser();

  this.filteredOptions = this.form.controls.city.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );

  }

experienceList=experience;
person! :person;

persons$ !:Observable<person[]>;
hide: boolean=true;


form = new FormGroup({
  fullName:new FormControl('',[Validators.required]),
  phoneNumber:new FormControl<number |null>(null,[Validators.required,Validators.min(0)]),
  city:new FormControl('',[Validators.required]),
  experience:new FormControl('',[Validators.required]),
days:new FormControl('',[Validators.required]),
profileImg:new FormControl(''),

  email:new FormControl('',[Validators.required, Validators.email]),
  password:new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
  confirmPassword:new FormControl('',[Validators.required]),
<<<<<<< HEAD
  skill: new FormControl<string []|undefined>([],[Validators.required]),
=======
  skill: new FormControl<string []>([],[Validators.required]),
>>>>>>> 79236132446034c752f2538a4f8b4116c8f7d0b2
  courses: new FormArray([]),
range :new FormGroup({
  start: new FormControl('',[Validators.required]),
  end: new FormControl('',[Validators.required]),
}),

},  
{validators: [passwordMatchingValidator]});

  // role!: string;
role:string ="person";
    days=days;
 
 

 

  

 
 

submit(){
this.role = "person";
console.log(this.form.get('skill')?.value);

  this.auth.signUpPerson(
   this.form.get('email')?.value+ '',
   this.form.get('password')?.value+'',
   this.form.get('fullName')?.value+ '',
   this.form.get('phoneNumber')?.value as number,
   this.form.get('city')?.value+ '',
   this.form.get('days')?.value+'',
   this.form.get('experience')?.value+ '',
   this.form.get('courses')?.value as courses[],
<<<<<<< HEAD
   this.form.get('skill')?.value,
   this.range?.value,
=======
   this.form.get('skill')?.value!,
      this.range?.value,
>>>>>>> 79236132446034c752f2538a4f8b4116c8f7d0b2
   this.role,
   this.downloadurl,


   // this.role
 ).then((user)=> {
  
   this.router.navigate(['volunteer/']);

   console.log(user);
 }).catch((error)=> {
   console.log(error)   
 });
}

unavailableDates(calenderDate:Date):boolean{
  return (calenderDate > new Date());
}
 get start(){
  return this.form.get('start');
 }
 get end(){
  return this.form.get('end');
 }
 get range() :FormGroup{
  return this.form.get('range') as FormGroup;
 }
get courses():FormArray{
  return this.form.get('courses')as FormArray;
}
get skill(){
  return this.form.get('skill');
}
addCourses(){
  const courseformarray = new FormGroup({
    title:new FormControl('',[Validators.required]),
    organization:new FormControl('',[Validators.required]),
    hours:new FormControl('',[Validators.required, Validators.min(0)])
})
this.courses.push(courseformarray);
}
 deletecourse(index:number){
  this.courses.removeAt(index);
 }


 upload(event:Event){
  console.log(event);
  let file = (event.target as HTMLInputElement)?.files?.[0];
  if(file)
  {this.storge.uploadimg(file).subscribe((value)=>{
    this.downloadurl=value;
  })}
}
geturl(){
 
	let x= `url("${this.downloadurl}")` ;
  return x;
}


private _filter(value: string): cities[] {
  const filterValue = value.toLowerCase();

  return this.Allcities.filter(option => option.city.toLowerCase().includes(filterValue));
}
}

