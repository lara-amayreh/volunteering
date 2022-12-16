import {FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { data } from 'citiesNames';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PersonsService } from '../persons.service';
import { person } from 'src/app/inteerfaces/person';
import { ErrorStateMatcher } from '@angular/material/core';
import {FormGroup, FormControl} from '@angular/forms';





export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}
@Component({
  selector: 'app-person-regester',
  templateUrl: './person-regester.component.html',
  styleUrls: ['./person-regester.component.css'],

})
export class PersonRegesterComponent implements OnInit {
  id:number= 1;
  persons:person[]=[];
  person:person={
id:this.id++,
fullName:'',
 city:'',
     phoneNumber:0,
    skills:'',
    email:'',
    password:'',
    experience:'',
     days:'',
 time:{
        startTime:'',
        endTime:'',
    }, 
     courses:'',
   

    
  } 
 
hide: boolean=true;


   emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  
    Cities =data;  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl('');
  filteredSkills: Observable<string[]>;
  skills: string[] = [];
  allSkills: string[] = ["Java", "Javascript", "Python", "Ruby", "Perl", "PHP", "XML", "C#", "C++","html",
  "Apache", "MySQL", "SAS", "JSON", "machine learning", "data mining", "SQLite", "RapidMiner", "frontend", "backend", "Angular", "Bootstrap"] ;
  allDays: string[] = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.','Fri.','Sat.'];

  @ViewChild('skillInput')
  skillInput!: ElementRef<HTMLInputElement>;



 

  constructor(private personservice:PersonsService ,private _formBuilder: FormBuilder) {this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
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
 this.id=this.person.id++;

   this.personservice.addPerson({...this.person});
}

 
  
}

