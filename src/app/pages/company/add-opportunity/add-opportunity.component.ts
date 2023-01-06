import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { opportunity } from 'src/app/lib/inteerfaces/opportunity';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { OportunitiesService } from 'src/app/lib/services/oportunities/oportunities.service';
import { allSkills } from 'src/assets/arrays/skills';

@Component({
  selector: 'app-add-opportunity',
  templateUrl: './add-opportunity.component.html',
  styleUrls: ['./add-opportunity.component.css']
})
export class AddOpportunityComponent{
  numberOfVolunteers!:number
  id:string='';
  constructor(private oportunityservice: OportunitiesService,private authservice:AuthService,
    private dialogRef: MatDialogRef<AddOpportunityComponent>,
    @Inject(MAT_DIALOG_DATA)
     private data: any)
     {
    this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice())),
    );
  }
 
  allSkills= allSkills;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl('');
  filteredSkills !: Observable<string[]>;
  skills: string[] = [];
 
  @ViewChild('skillInput')
  skillInput!: ElementRef<HTMLInputElement>;
  // ngOnInit(): void {
  
   form = new FormGroup({
    name:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    skills: new FormControl('',[Validators.required]),
    numberOfVolunteers: new FormControl<number|null>(null,[Validators.required, Validators.min(0)]),
    range :new FormGroup({
      start: new FormControl('',[Validators.required]),
      end: new FormControl(''),
    }),
   
  
});


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
confirm(){
 
  // this.shirtCollection = afs.collection<Shirt>('shirts');
  // .snapshotChanges() returns a DocumentChangeAction[], which contains
  // a lot of information about "what happened" with each change. If you want to
  // get the data and the id use the map operator.
  

this.authservice.userState$
.pipe(switchMap( (value) => {
  if(value){
    console.log(value);

return this.oportunityservice.addOpportunity({
  userid : value.id,
id:this.id,
companyName:value.name,
logo:value.logo,
  name:this.form.get('name')?.value +'',
  description:this.form.get('description')?.value+'',
  skills:this.form.get('skills')?.value+'',
  numberOfVolunteers:Number(this.form.get('numberOfVolunteers')?.value+''),
  range:this.range?.value,


   

 



})

}
  
  else{
  return of (null);}
})).subscribe((value)=>{
  if(!value)
  alert("connot add opportunity");
  else
  this.id=value.id;
  this.oportunityservice.updatid(this.id);
  console.log(value);
})

this.dialogRef.close(true);

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
}
