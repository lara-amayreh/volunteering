import { NgModule } from '@angular/core';
import { LandingComponent } from './pages/landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
const routes: Routes = [
  {path:'', component:LandingComponent, pathMatch: 'full'},
  {path:'company', loadChildren: ()=> import('./pages/company/company.module').then((m)=> m.CompanyModule), 
  // canActivate:[NotloggedinGuard]
},

  {path:'auth', loadChildren: ()=> import('./pages/auth/auth.module').then((m)=> m.AuthModule), 
//   canActivate: [AuthGuard]
 },
//  {path:'volunteer', loadChildren: ()=> import('./pages/volunteer/volunteer.module').then((m)=> m.VolunteerModule), 
// //   canActivate: [AuthGuard]
//  },
 {path:"contact", component:ContactComponent},
{path:"about", component:AboutComponent},
{path:"home", component:LandingComponent},


];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
