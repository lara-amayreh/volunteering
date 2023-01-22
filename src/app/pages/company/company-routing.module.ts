import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllActivitiesComponent } from '../volunteer/all-activities/all-activities.component';
import { CompanyActivitiesComponent } from './company-activities/company-activities.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { LogedinGuard } from 'src/app/lib/guards/logedin.guard';
import { AuthGuard } from 'src/app/lib/guards/auth.guard';
import { LandingComponent } from '../landing/landing.component';
import { AllCompaniesComponent } from '../volunteer/all-companies/all-companies.component';
import { CompanyDetailsComponent } from '../volunteer/company-details/company-details.component';
import { AllVolunteersComponent } from './all-volunteers/all-volunteers.component';
import { VolunteerDetailsComponent } from './volunteer-details/volunteer-details.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

const routes: Routes = [

  {path:'',
  children:[
    {path:'',component:LandingComponent,pathMatch:'full'},
    {path:'opportunities', component:AllActivitiesComponent},
    {path:'organizations', component:AllCompaniesComponent},
    {path:'your-Activities', component:CompanyActivitiesComponent,pathMatch:'full', canActivate: [AuthGuard]},
    {path:'All-Volunteers', component:AllVolunteersComponent,canActivate: [AuthGuard]},
    {path:'All-Volunteers/details/:id', component: VolunteerDetailsComponent, canActivate: [AuthGuard]},
    {path:'your-Activities/:id', component: ActivityDetailsComponent, canActivate: [AuthGuard]},

      {path:'organizations/details/:id', component: CompanyDetailsComponent, canActivate: [AuthGuard]},
  ]}, 




{path:'profile/:id', component: CompanyProfileComponent, canActivate: [AuthGuard]}

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
