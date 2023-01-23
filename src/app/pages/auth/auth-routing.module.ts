import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogedinGuard } from 'src/app/lib/guards/logedin.guard';
import { LandingComponent } from '../landing/landing.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LandingComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'register',
        loadChildren: () =>
          import('./regestration/regestration.module').then(
            (m) => m.RegestrationModule
          ),
        canActivate: [LogedinGuard],
      },
      { path: '**', component: PagenotfoundComponent, pathMatch: 'full' },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
