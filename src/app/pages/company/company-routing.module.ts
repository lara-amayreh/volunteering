import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { AllActivitiesComponent } from '../volunteer/all-activities/all-activities.component';
import { CompanyActivitiesComponent } from './company-activities/company-activities.component';

const routes: Routes = [
  {path:'', component: CompanyDashboardComponent},
 {path:'opportunities', component: CompanyActivitiesComponent},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
