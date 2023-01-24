import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { companytypes } from 'src/assets/arrays/company-types';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StorageService } from 'src/app/lib/services/storage/storage.service';
import { passwordMatchingValidator } from 'src/app/lib/validators/passwordmatching';

@Component({
  selector: 'app-organaization-regester',
  templateUrl: './organaization-regester.component.html',
  styleUrls: ['./organaization-regester.component.css'],
})
export class OrganaizationRegesterComponent implements OnInit {
  role: string = 'company';
  types = companytypes;
  hide: boolean = true;
  downloadurl: string ='../../../../../assets/images/company-profile.png';
  constructor(
    public auth: AuthService,
    private router: Router,
    private storge: StorageService
  ) {}

  form = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      profileImg: new FormControl(''),
      url: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})'
        ),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    },
    { validators: [passwordMatchingValidator] }
  );
  ngOnInit(): void {}
  submit() {
    this.role = 'company';
    this.auth
      .signUpCompany(
        this.form.get('email')?.value + '',
        this.form.get('password')?.value + '',
        this.form.get('name')?.value + '',
        this.form.get('phoneNumber')?.value as number,
        this.form.get('city')?.value + '',
        this.downloadurl,
        this.form.get('type')?.value + '',
        this.form.get('url')?.value + '',
        this.role,
        0
       
        
      )
      .then((user) => {
        this.router.navigate(['company/']);
      })
      .catch((error) => {});
  }
  upload(event: Event) {
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
}
