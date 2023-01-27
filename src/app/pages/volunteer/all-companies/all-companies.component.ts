import { Component } from '@angular/core';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { map, Observable, startWith } from 'rxjs';
import { companytypes } from 'src/assets/arrays/company-types';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/lib/services/user/user.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css'],
})
export class AllCompaniesComponent {
  allcompanies!: organization[];
  allcompaniescopy!: Observable<organization[] | undefined>;
  companiesNames: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(private auth: AuthService, private userservice: UserService) {}
  types = companytypes;

  ngOnInit(): void {
    this.userservice.getAllusersByRole('company').subscribe((val) => {
      this.allcompanies = val as organization[];
      val.forEach((vall, index) => {
        if (!this.companiesNames.includes(vall.name + ''))
          this.companiesNames?.push(vall.name + '');
      });
    });

    this.filteredOptions = this.form.controls.name.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.companiesNames.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  form = new FormGroup({
    type: new FormControl(''),
    name: new FormControl(''),
  });
  get name() {
    return this.form.get('name')?.value;
  }
  get type() {
    return this.form.get('type')?.value;
  }
  filter() {
    this.userservice
      .getfilteredusers(
        'company',
        this.name?.toLocaleLowerCase() + '',
        this.type + ''
      )
      .subscribe((val) => {
        this.allcompanies = val;
      });
  }
}
