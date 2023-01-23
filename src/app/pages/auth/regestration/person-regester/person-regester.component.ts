import { FormArray, Validators } from '@angular/forms';
import { data } from 'citiesNames';
import { allSkills } from 'src/assets/arrays/skills';
import { experience } from 'src/assets/arrays/experience';
import { days } from 'src/assets/arrays/days';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { courses } from 'src/app/lib/inteerfaces/person';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { passwordMatchingValidator } from 'src/app/lib/validators/passwordmatching';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { StorageService } from 'src/app/lib/services/storage/storage.service';
import { cities } from 'src/app/lib/inteerfaces/cities';

@Component({
  selector: 'app-person-regester',
  templateUrl: './person-regester.component.html',
  styleUrls: ['./person-regester.component.css'],
})
export class PersonRegesterComponent implements OnInit {
  downloadurl: string = '../../../../../assets/images/profile-img.png';
  filteredOptions!: Observable<cities[]>;
  Allcities = data;
  skills = allSkills;
  experienceList = experience;
  hide: boolean = true;
  role: string = 'person';
  days = days;

  constructor(
    private router: Router,
    public auth: AuthService,
    private storge: StorageService
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.form.controls.city.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  form = new FormGroup(
    {
      fullName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      city: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      days: new FormControl('', [Validators.required]),
      profileImg: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      skill: new FormControl<string[]>([], [Validators.required]),
      courses: new FormArray([]),
      range: new FormGroup({
        start: new FormControl('', [Validators.required]),
        end: new FormControl('', [Validators.required]),
      }),
    },
    { validators: [passwordMatchingValidator] }
  );

  submit() {
    this.role = 'person';
    this.auth
      .signUpPerson(
        this.form.get('email')?.value + '',
        this.form.get('password')?.value + '',
        this.form.get('fullName')?.value + '',
        this.form.get('phoneNumber')?.value as number,
        this.form.get('city')?.value + '',
        this.form.get('days')?.value + '',
        this.form.get('experience')?.value + '',
        this.form.get('courses')?.value as courses[],
        this.form.get('skill')?.value!,
        this.range?.value,
        this.role,
        this.downloadurl
      )
      .then((user) => {
        this.router.navigate(['volunteer/']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  unavailableDates(calenderDate: Date): boolean {
    return calenderDate > new Date();
  }
  get start() {
    return this.form.get('start');
  }
  get end() {
    return this.form.get('end');
  }
  get range(): FormGroup {
    return this.form.get('range') as FormGroup;
  }
  get courses(): FormArray {
    return this.form.get('courses') as FormArray;
  }
  get skill() {
    return this.form.get('skill');
  }
  addCourses() {
    const courseformarray = new FormGroup({
      title: new FormControl('', [Validators.required]),
      organization: new FormControl('', [Validators.required]),
      hours: new FormControl('', [Validators.required, Validators.min(0)]),
    });
    this.courses.push(courseformarray);
  }
  deletecourse(index: number) {
    this.courses.removeAt(index);
  }

  upload(event: Event) {
    console.log(event);
    let file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.storge.uploadimg(file).subscribe((value) => {
        this.downloadurl = value;
      });
    }
  }
  geturl() {
    let x = `url("${this.downloadurl}")`;
    return x;
  }

  private _filter(value: string): cities[] {
    const filterValue = value.toLowerCase();

    return this.Allcities.filter((option) =>
      option.city.toLowerCase().includes(filterValue)
    );
  }
}
