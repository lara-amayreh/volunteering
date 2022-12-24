import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModuleModule } from 'src/app/lib/material/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './regestration/register/register.component';
import { PersonRegesterComponent } from './regestration/person-regester/person-regester.component';
import { OrganaizationRegesterComponent } from './regestration/organaization-regester/organaization-regester.component';


@NgModule({
  declarations: [LoginComponent,RegisterComponent,PersonRegesterComponent,OrganaizationRegesterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class AuthModule { }
