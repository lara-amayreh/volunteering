import { NgModule } from '@angular/core';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { MaterialImports, SharedModuleModule } from 'src/app/lib/material/shared-module.module';
import { AddOpportunityComponent } from './add-opportunity/add-opportunity.component';
import { CompanyDetailsComponent } from '../volunteer/company-details/company-details.component';
import { CompanyActivitiesComponent } from './company-activities/company-activities.component';
import { CommonModule } from '@angular/common';
import { UpdateCompanyComponent } from './update-company/update-company.component';

@NgModule({
  declarations: [
    CompanyDashboardComponent,
    AddOpportunityComponent,
    CompanyDetailsComponent,
    CompanyActivitiesComponent,
    UpdateCompanyComponent,


    
  ],
  imports: [
    
    CompanyRoutingModule,
    CommonModule,
    SharedModuleModule

  ]
})
export class CompanyModule { }
