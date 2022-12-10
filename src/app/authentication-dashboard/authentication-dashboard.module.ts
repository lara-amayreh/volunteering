import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { PersonRegesterComponent } from './person-regester/person-regester.component';
import { OrganaizationRegesterComponent } from './organaization-regester/organaization-regester.component';


 const routes:Routes=[
  {path:"person",component:PersonRegesterComponent ,pathMatch:"full"},
    {path:"organaization",component:OrganaizationRegesterComponent ,pathMatch:"full"},

  {path:'',component:RegisterComponent,pathMatch:"full"},

 ]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, PersonRegesterComponent, OrganaizationRegesterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
        MatInputModule,
   MatFormFieldModule,
   MatCardModule,
   RouterModule.forChild(routes),
   
   
  ],exports:[LoginComponent, RegisterComponent, PersonRegesterComponent, OrganaizationRegesterComponent]
})
export class AuthenticationDashboardModule { 
  constructor(){

  }
}
