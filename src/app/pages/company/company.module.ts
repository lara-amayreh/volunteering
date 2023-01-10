import { NgModule } from '@angular/core';
import { CompanyRoutingModule } from './company-routing.module';
import { MaterialImports, SharedModuleModule } from 'src/app/lib/material/shared-module.module';
import { AddOpportunityComponent } from './add-opportunity/add-opportunity.component';
import { CompanyDetailsComponent } from '../volunteer/company-details/company-details.component';
import { CompanyActivitiesComponent } from './company-activities/company-activities.component';
import { CommonModule } from '@angular/common';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { AllVolunteersComponent } from './all-volunteers/all-volunteers.component';

@NgModule({
  declarations: [
    AddOpportunityComponent,
    CompanyDetailsComponent,
    CompanyActivitiesComponent,
    UpdateCompanyComponent,
    CompanyProfileComponent,
    AllVolunteersComponent,

    
  ],
  imports: [
    
    CompanyRoutingModule,
    CommonModule,
    SharedModuleModule,

  ]
})
export class CompanyModule { }
