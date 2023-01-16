import { NgModule } from '@angular/core';
import { LandingComponent } from './pages/landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './lib/guards/auth.guard';
import { LogedinGuard } from './lib/guards/logedin.guard';

const routes: Routes = [
  {path:'', component:LandingComponent, pathMatch: 'full'},
  {path:'company', loadChildren: ()=> import('./pages/company/company.module').then((m)=> m.CompanyModule), 
   
},

  {path:'auth', loadChildren: ()=> import('./pages/auth/auth.module').then((m)=> m.AuthModule), 
canActivate: [LogedinGuard]
 },
{path:'volunteer', loadChildren: ()=> import('./pages/volunteer/volunteer.module').then((m)=> m.VolunteerModule), 
 
 },
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
