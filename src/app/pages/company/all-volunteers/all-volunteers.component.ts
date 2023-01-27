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
  styleUrls: ['./all-volunteers.component.css'],
})
export class AllVolunteersComponent implements OnInit {
  AllVolunteers!: Observable<person[]>;
  allimages: string[] = [];
  skills = allSkills;
  filteredOptions!: Observable<cities[]>;

  Allcities = data;
  constructor(private userservice: UserService, public auth: AuthService) {}
  ngOnInit(): void {
    this.filteredOptions = this.form.controls.city.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.auth.userState$.subscribe((value) => {
      if (value) {
        this.AllVolunteers = this.userservice.getAllusersByRole('person');
      }
    });
  }
  form = new FormGroup({
    skill: new FormControl(''),
    city: new FormControl(''),
  });
  get skill() {
    return this.form.get('skill')?.value;
  }
  get city() {
    return this.form.get('city')?.value;
  }

  filter() {
    console.log(this.form.get('skill')?.value);
    if (this.form.get('skill')?.value) {
      this.AllVolunteers = this.userservice.getfilteredvolunteers(
        this.form?.get('skill')?.value,
        this.city + ''
      );
    }
  }

  private _filter(value: string): cities[] {
    const filterValue = value.toLowerCase();

    return this.Allcities.filter((option) =>
      option.city.toLowerCase().includes(filterValue)
    );
  }
}
