import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerRoutingModule } from './volunteer-routing.module';
import { SharedModuleModule } from 'src/app/lib/material/shared-module.module';
import { VolunteerDetailsComponent } from '../company/volunteer-details/volunteer-details.component';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';
import { AllActivitiesComponent } from './all-activities/all-activities.component';
import { PastActivitiesComponent } from './past-activities/past-activities.component';
import { AllCompaniesComponent } from './all-companies/all-companies.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UpdateVolunteerComponent } from './update-volunteer/update-volunteer.component';
@NgModule({
  declarations: [
    VolunteerDetailsComponent,
    VolunteerProfileComponent,
    AllActivitiesComponent,
    PastActivitiesComponent,
    AllCompaniesComponent,
    UpdateVolunteerComponent
  ],
  imports: [
    CommonModule,
    VolunteerRoutingModule,
    SharedModuleModule,
    LayoutModule,
  ],
  exports:[
  ]
})
export class VolunteerModule { }
