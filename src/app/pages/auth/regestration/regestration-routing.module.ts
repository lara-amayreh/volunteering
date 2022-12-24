import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganaizationRegesterComponent } from './organaization-regester/organaization-regester.component';
import { PersonRegesterComponent } from './person-regester/person-regester.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
 {path:'',component:RegisterComponent,pathMatch:"full"},
 {path:'person',component:PersonRegesterComponent},
 {path:'organization',component:OrganaizationRegesterComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegestrationRoutingModule { }
