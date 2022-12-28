import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { MaterialImports } from 'src/app/lib/material/shared-module.module';
import { AddOpportunityComponent } from './add-opportunity/add-opportunity.component';



@NgModule({
  declarations: [
    CompanyDashboardComponent,
    AddOpportunityComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MaterialImports,
  ]
})
export class CompanyModule { }
