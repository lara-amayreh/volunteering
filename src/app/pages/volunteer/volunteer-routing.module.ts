import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllActivitiesComponent } from './all-activities/all-activities.component';
import { AllCompaniesComponent } from './all-companies/all-companies.component';
import { AuthGuard } from 'src/app/lib/guards/auth.guard';
import { ApplyOnActivityComponent } from './apply-on-activity/apply-on-activity.component';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';
import { LandingComponent } from '../landing/landing.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { PastActivitiesComponent } from './past-activities/past-activities.component';
import { ActivityDetailsComponent } from '../company/activity-details/activity-details.component';
import { CompanyProfileComponent } from '../company/company-profile/company-profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },

  { path: 'opportunities', component: AllActivitiesComponent },
  {
    path: 'opportunities/:id',
    component: ActivityDetailsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'organizations',
    component: AllCompaniesComponent,
    pathMatch: 'full',
  },
  {
    path: 'organizations/profile/:id',
    component: CompanyProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-Activities',
    component: PastActivitiesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-Activities/:id',
    component: ActivityDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'apply',
    component: ApplyOnActivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    component: VolunteerProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PagenotfoundComponent, pathMatch: 'full' },

  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerRoutingModule {}
