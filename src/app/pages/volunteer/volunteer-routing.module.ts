import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { VolunteerDashboardComponent } from './volunteer-dashboard/volunteer-dashboard.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

const routes: Routes = [
  {path:'', component: VolunteerDashboardComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)
    
  ],
  exports:[RouterModule]
})
export class VolunteerRoutingModule { }
