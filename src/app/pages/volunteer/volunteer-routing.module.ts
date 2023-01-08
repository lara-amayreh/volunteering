import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AllActivitiesComponent } from './all-activities/all-activities.component';
import { AllCompaniesComponent } from './all-companies/all-companies.component';
import { AuthGuard } from 'src/app/lib/guards/auth.guard';
import { ApplyOnActivityComponent } from './apply-on-activity/apply-on-activity.component';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { LandingComponent } from '../landing/landing.component';

const routes: Routes = [
  {path:'',
  children:[
    {path:'',component:LandingComponent,pathMatch:'full'},

    {path:'opportunities', component:AllActivitiesComponent},
    {path:'organizations', component:AllCompaniesComponent},
      {path:'organizations/details/:id', component: CompanyDetailsComponent, canActivate: [AuthGuard]},
  ]}, 


  
  {path:'apply', component:ApplyOnActivityComponent,canActivate: [AuthGuard]},
  {path:'profile', component: VolunteerProfileComponent, canActivate: [AuthGuard]},


]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)
    
  ],
  exports:[RouterModule]
})
export class VolunteerRoutingModule { }
