import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerRoutingModule } from './volunteer-routing.module';
import { VolunteerDashboardComponent } from './volunteer-dashboard/volunteer-dashboard.component';



@NgModule({
  declarations: [
    VolunteerDashboardComponent
  ],
  imports: [
    CommonModule,
    VolunteerRoutingModule
  ]
})
export class VolunteerModule { }
