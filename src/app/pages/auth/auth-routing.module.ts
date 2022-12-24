import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { OrganaizationRegesterComponent } from './regestration/organaization-regester/organaization-regester.component';
import { PersonRegesterComponent } from './regestration/person-regester/person-regester.component';
import { RegisterComponent } from './regestration/register/register.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', component: LoginComponent},

   
  {path:'register', loadChildren: ()=> import('./regestration/regestration.module').then((m)=> m.RegestrationModule), 
  //   canActivate: [AuthGuard]
   },
  { path:"**", component:PagenotfoundComponent,pathMatch:"full"},


];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
