import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './authentication-dashboard/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';




 const routs : Routes=[

 {path:"login", component:LoginComponent},
 {path:"register",loadChildren:()=>import('./authentication-dashboard/authentication-dashboard.module')
 .then((m)=>m.AuthenticationDashboardModule)},
// { path:"**", component:AppComponent},

  ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

   
    

     


  ],
  imports: [
    BrowserModule,
        RouterModule.forRoot(routs),
    BrowserAnimationsModule,
    LayoutModule,
        MatToolbarModule,
        MatIconModule,
        

   
   
   


     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
