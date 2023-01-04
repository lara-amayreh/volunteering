import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { VolunteerDashboardComponent } from './volunteer-dashboard/volunteer-dashboard.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AllActivitiesComponent } from './all-activities/all-activities.component';
import { AllCompaniesComponent } from './all-companies/all-companies.component';
import { AuthGuard } from 'src/app/lib/guards/auth.guard';
import { ApplyOnActivityComponent } from './apply-on-activity/apply-on-activity.component';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';

const routes: Routes = [
  {path:'', component: VolunteerDashboardComponent, canActivate: [AuthGuard]}, 
  {path:'opportunities', component:AllActivitiesComponent},
  {path:'organizations', component:AllCompaniesComponent},
  {path:'apply', component:ApplyOnActivityComponent,canActivate: [AuthGuard]},
  {path:'profile', component: VolunteerProfileComponent, canActivate: [AuthGuard]}


]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)
    
  ],
  exports:[RouterModule]
})
export class VolunteerRoutingModule { }
