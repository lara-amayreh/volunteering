import {FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { data } from 'citiesNames';
import { days } from 'src/assets/arrays/days';
import { allSkills } from 'src/assets/arrays/skills';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PersonsService } from '../persons.service';
import { person } from 'src/app/inteerfaces/person';
import {FormGroup, FormControl} from '@angular/forms';







@Component({
  selector: 'app-person-regester',
  templateUrl: './person-regester.component.html',
  styleUrls: ['./person-regester.component.css'],

})
export class PersonRegesterComponent implements OnInit {
  id:number= 1;
  persons:person[]=[];

 
hide: boolean=true;


form = new FormGroup({
  fullName:new FormControl('',[Validators.required]),
  phoneNumber:new FormControl<number |null>(null,[Validators.required,Validators.min(0)]),
  city:new FormControl('',[Validators.required]),
  experience:new FormControl('',[Validators.required]),
days:new FormControl('',[Validators.required]),
  email:new FormControl('',[Validators.required, Validators.email]),
  password:new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
  skills: new FormControl('',[Validators.required]),
  courses: new FormControl('',[Validators.required]),

  

    
})
  
    Cities =data;  
    days=days;
    allSkills= allSkills;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl('');
  filteredSkills: Observable<string[]>;
  skills: string[] = [];
 
  @ViewChild('skillInput')
  skillInput!: ElementRef<HTMLInputElement>;



 

  constructor(private personservice:PersonsService ,private _formBuilder: FormBuilder) 
  {this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice())),
    );}
  ngOnInit(): void {
    
    this.persons = this.personservice.getperson();
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
submit(){
//  this.id=this.person.id++;
   this.personservice.addPerson({...this.form.value} as person);
}

 
  
}

