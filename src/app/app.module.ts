import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './authentication-dashboard/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LandingComponent } from './components/landing/landing.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SideNavComponent } from './components/side-nav/side-nav.component';


 const routs : Routes=[
{path:"contact", component:ContactComponent},
{path:"about", component:AboutComponent},
{path:"", component:LandingComponent,pathMatch:"full"},
{path:"home", component:LandingComponent},

 {path:"login", component:LoginComponent},
 {path:"register",loadChildren:()=>import('./authentication-dashboard/authentication-dashboard.module')
 .then((m)=>m.AuthenticationDashboardModule)},
 { path:"**", component:PagenotfoundComponent},

  ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    LandingComponent,
    PagenotfoundComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    RouterModule.forRoot(routs),
    LayoutModule,
    BrowserAnimationsModule,
    SharedModuleModule
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
