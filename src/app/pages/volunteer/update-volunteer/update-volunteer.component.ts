import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { courses, person } from 'src/app/lib/inteerfaces/person';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { StorageService } from 'src/app/lib/services/storage/storage.service';
import { UserService } from 'src/app/lib/services/user/user.service';
import { experience } from 'src/assets/arrays/experience';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { data } from 'citiesNames';
import { allSkills } from 'src/assets/arrays/skills';
import { days } from 'src/assets/arrays/days';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { apply } from 'src/app/lib/inteerfaces/apply';

@Component({
  selector: 'app-update-volunteer',
  templateUrl: './update-volunteer.component.html',
  styleUrls: ['./update-volunteer.component.css']
})
export class UpdateVolunteerComponent implements OnInit {
  downloadurl!: string;
  role:string="person";
  experienceList=experience;
  person! :person;
  userdetails!:person;
  persons$ !:Observable<person[]>;
  hide: boolean=true;
    Cities = data;  
    days=days;
    allSkills= allSkills;
    id:string='';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl('');
  filteredSkills: Observable<string[]>;
  skills: string[] = [];
 
  @ViewChild('skillInput')
  skillInput!: ElementRef<HTMLInputElement>;

  constructor( private opportunityservice:OportunitiesService, private storage:StorageService, private afStorage :AngularFireStorage, private userservice:UserService, private authservice:AuthService,     private dialogRef: MatDialogRef<UpdateVolunteerComponent>, public firestore:AngularFirestore,
 
      @Inject(MAT_DIALOG_DATA) public Data: {id: string, company:any})
       {this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
        startWith(null),
        map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice())),
      );}
  
 
  ngOnInit(): void {
    this.authservice.userState$.subscribe((value)=>{
    (value.courses).forEach((val:courses)=>{
     this.addCourse(val)
      
     
   
    })
        this.id = value.id
      this.form.get('fullName')?.setValue(value.fullName);
      this.form.get('phoneNumber')?.setValue(value.phoneNumber);
      this.form.get('city')?.setValue(value.city);
      this.form.get('experience')?.setValue(value.experience);
      this.role = value.role;
      this.downloadurl = value.profileImg;
     



  })
}

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
  
  form = new FormGroup({
    fullName:new FormControl('',[Validators.required]),
    phoneNumber:new FormControl<number |null>(null,[Validators.required,Validators.min(0)]),
    city:new FormControl('',[Validators.required]),
    experience:new FormControl('',[Validators.required]),
  // days:new FormControl('',[Validators.required]),
  profileImg:new FormControl(''),
  
   courses: new FormArray([]),
   
  
})


submit(){
  this.userservice.updateuser(this.id,(
    {
   fullName:this.form.get('fullName')?.value+ '',
   phoneNumber: this.form.get('phoneNumber')?.value as number,
   city:this.form.get('city')?.value+ '',
    profileImg:this.downloadurl,
   experience:this.form.get('experience')?.value+'',
 courses:this.form.get('courses')?.value,
//  skills:this.form.get('skills')?.value+'',
      


  } ))
 this.authservice.userState$.subscribe((val)=>{
  this.userdetails=val;
 })
this.opportunityservice.getUserOpportunities(this.id).subscribe((val)=>{
val.forEach((applicant)=>{
  console.log(this.userdetails);
  this.opportunityservice.getvolunteer(this.userdetails?.id+'',applicant.id).subscribe((v)=>{
    // console.log(v[0].id)
  this.firestore.collection<apply>('oportunities/' + applicant.id + '/applicants')
  .doc(v[0].id).update({userdetails:this.userdetails
  }
)
})
})})

 

 
  
  this.dialogRef.close(true);


}


get start(){
  return this.form.get('start');
 }
 get end(){
  return this.form.get('end');
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

return courseformarray;
}
addCourse(obj:any){
  this.courses.push(new FormGroup({
    title:new FormControl(obj.title,[Validators.required]),
    organization:new FormControl(obj.organization,[Validators.required]),
    hours:new FormControl(obj.hours,[Validators.required, Validators.min(0)])
  }))
}
 deletecourse(index:number){
  this.courses.removeAt(index);
 }
upload(event:Event){
  let file = (event.target as HTMLInputElement)?.files?.[0];
  if(file)
  {this.storage.uploadimg(file).subscribe((value)=>{
    this.downloadurl=value;
  })}
}
}

