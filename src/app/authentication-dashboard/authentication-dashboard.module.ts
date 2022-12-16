import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { PersonRegesterComponent } from './person-regester/person-regester.component';
import { OrganaizationRegesterComponent } from './organaization-regester/organaization-regester.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';

 const routes:Routes=[
  {path:"person",component:PersonRegesterComponent ,pathMatch:"full"},
    {path:"organaization",component:OrganaizationRegesterComponent ,pathMatch:"full"},

  {path:'',component:RegisterComponent,pathMatch:"full"},
  { path:"**", component:PagenotfoundComponent,pathMatch:"full"},

 ]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, PersonRegesterComponent, OrganaizationRegesterComponent],
  imports: [
    CommonModule,
   RouterModule.forChild(routes),
   SharedModuleModule,
   FormsModule,
 
   
   
  ],exports:[LoginComponent, RegisterComponent, PersonRegesterComponent, OrganaizationRegesterComponent]
})
export class AuthenticationDashboardModule { 
  constructor(){

  }
}
