import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerRoutingModule } from './volunteer-routing.module';
import { VolunteerDashboardComponent } from './volunteer-dashboard/volunteer-dashboard.component';
import { SharedModuleModule } from 'src/app/lib/material/shared-module.module';
import { VolunteerDetailsComponent } from '../company/volunteer-details/volunteer-details.component';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';
import { AllActivitiesComponent } from './all-activities/all-activities.component';
import { PastActivitiesComponent } from './past-activities/past-activities.component';
import { AllCompaniesComponent } from './all-companies/all-companies.component';

@NgModule({
  declarations: [
    VolunteerDashboardComponent,
    VolunteerDetailsComponent,
    VolunteerProfileComponent,
    AllActivitiesComponent,
    PastActivitiesComponent,
    AllCompaniesComponent
  ],
  imports: [
    CommonModule,
    VolunteerRoutingModule,
    SharedModuleModule,
  ]
})
export class VolunteerModule { }
