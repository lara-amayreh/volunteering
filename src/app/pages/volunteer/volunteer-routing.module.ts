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
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { PastActivitiesComponent } from './past-activities/past-activities.component';
import { ActivityDetailsComponent } from '../company/activity-details/activity-details.component';
import { CompanyProfileComponent } from '../company/company-profile/company-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'LandingComponent',pathMatch:'full'},
 
    {path:'opportunities', component:AllActivitiesComponent},
    {path:'opportunities/:id', component: ActivityDetailsComponent},

    {path:'organizations', component:AllCompaniesComponent},
    

      {path:'organizations/profile/:id', component: CompanyProfileComponent, canActivate: [AuthGuard]},
      
        // {path:'details/:id', component: CompanyDetailsComponent, canActivate: [AuthGuard]},  
      


    
      {path:'my-Activities', component: PastActivitiesComponent, canActivate: [AuthGuard]},

  {path:'apply', component:ApplyOnActivityComponent,canActivate: [AuthGuard]},
  {path:'profile/:id', component: VolunteerProfileComponent},
      {path:'**', component: PagenotfoundComponent,pathMatch:"full"},

   


  
  {path:'**', component: PagenotfoundComponent},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)
    
  ],
  exports:[RouterModule]
})
export class VolunteerRoutingModule { }
