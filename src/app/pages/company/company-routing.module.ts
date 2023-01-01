import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { AllActivitiesComponent } from '../volunteer/all-activities/all-activities.component';
import { CompanyActivitiesComponent } from './company-activities/company-activities.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { LogedinGuard } from 'src/app/lib/guards/logedin.guard';
import { AuthGuard } from 'src/app/lib/guards/auth.guard';

const routes: Routes = [
  {path:'', component: CompanyDashboardComponent},
 {path:'opportunities', component: CompanyActivitiesComponent},
 {path:'profile', component: CompanyProfileComponent, canActivate: [AuthGuard]}

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
