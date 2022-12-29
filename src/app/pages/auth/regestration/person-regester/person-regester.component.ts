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
import { person } from 'src/app/lib/inteerfaces/person';

import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

import { passwordMatchingValidator } from 'src/app/lib/validators/passwordmatching';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { UserService } from 'src/app/lib/services/user/user.service';
import { users } from 'src/app/lib/inteerfaces/users';





@Component({
  selector: 'app-person-regester',
  templateUrl: './person-regester.component.html',
  styleUrls: ['./person-regester.component.css'],

})
export class PersonRegesterComponent implements OnInit {
  constructor(private userservice:UserService ,private _formBuilder: FormBuilder,private router: Router,private auth:AuthService) 
  {this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice())),
    );}
 
  ngOnInit(): void {
  // this.persons$= this.userservice.getuser();
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
  email:new FormControl('',[Validators.required, Validators.email]),
  password:new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
  confirmPassword:new FormControl('',[Validators.required]),
  skills: new FormControl('',[Validators.required]),
  courses: new FormArray([]),
range :new FormGroup({
  start: new FormControl('',[Validators.required]),
  end: new FormControl('',[Validators.required]),
}),

},  
{validators: [passwordMatchingValidator]});

  // role!: string;
role:string="volunteer";
    Cities =data;  
    days=days;
    allSkills= allSkills;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl('');
  filteredSkills: Observable<string[]>;
  skills: string[] = [];
 
  @ViewChild('skillInput')
  skillInput!: ElementRef<HTMLInputElement>;



 

  

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our skill
    if (value) {
      this.skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillsCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }
// submit(){
// console.log(this.form.value);
//     //register user in firebase
//     this.auth.signUp(
//       this.form.get('email')?.value+ '',
//       this.form.get('password')?.value+'',
//       // this.role
//     ).then((user)=> {

//       //save other form fields collection 

      
//       this.router.navigate(['volunteer/']);

//       console.log(user);
//     }).catch((error)=> {
//       console.log(error)  
//     });
//   }

// submit(){
//   //register user in firebase

 
//  //  this.organization =this.form.value;
//  //  this.organization.role=this.role;
//   this.auth.signUp(
//    this.form.get('email')?.value+ '',
//    this.form.get('password')?.value+'',
//    // this.role
//  ).then((user)=> {
  
   
//     this.person.city =this.form.get('city')?.value+'';
//     this.person.courses =this.form.get('courses')?.value+'';
//     this.person.days =this.form.get('days')?.value+'';
//     this.person.experience = this.form.get('experience')?.value+'';
//     this.person.fullName = this.form.get('fullName')?.value+'';
//     this.person.password = this.form.get('password')?.value+'';
// this.person.role =this.role;
//   this.person.start =this.form.value.range?.start+'';
//   this.person.end =this.form.value.range?.start+'';
//   this.person.uid = user.user?.uid;
//   this.person.email =this.form.get('email')?.value+'';
//   this.person.phoneNumber =this.form.get('phoneNumber')?.value!;
//   this.personservice.addStudent({...this.person} as person);
//  this.router.navigate(['volunteer/']);

     
  
   
  
  
  
  


// //   this.role="volunteer";
// //   this.person.role=this.role;
// // this.person.start!=this.form.value.range?.start;
// // this.person.end!=this.form.value.range?.start;
// // this.person = { ...this.form.value }as person;

// // // console.log(this.opportunity);
// // // this.opportunity.role=this.role;
// //    //save other form fields collection 
// // this.personservice.addStudent({...this.person});

// //    this.router.navigate(['volunteer/']);

// //    console.log(user);
//  }).catch((error)=> {
//    console.log(error)   
//  });
// }
submit(){
  //register user in firebase

  // this.role = "volunteer";
 
 //  this.organization =this.form.value;
 //  this.organization.role=this.role;
  this.auth.signUp(
   this.form.get('email')?.value+ '',
   this.form.get('password')?.value+'',
   // this.role
 ).then((user)=> {
  
  this.person = {...this.form.value}as person;
  this.person.role =this.role;
  // this.person.role=this.role;
  this.person.uid = user.user?.uid;
   //save other form fields collection 
this.userservice.adduser({...this.person} as users);

   this.router.navigate(['volunteer/']);

   console.log(user);
 }).catch((error)=> {
   console.log(error)   
 });
}


 get start(){
  return this.form.get('start');
 }
 get end(){
  return this.form.get('end');
 }
 get range(){
  return this.form.get('range');
 }
get courses():FormArray{
  return this.form.get('courses')as FormArray;
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
}

